import axios from 'axios';

/**
 * Тип данных, которые мы будем возвращать в store.
 * Например, если base='RUB', то rates.USD=88.15 => 1 USD = 88.15 RUB
 */
export interface RatesData {
    USD: number;
    EUR: number;
    RUB: number;
}

/**
 * Запрос к API и парсинг
 */
export async function fetchRates(base: string): Promise<RatesData> {
    // Делаем запрос к указанному API:
    const response = await axios.get('https://status.neuralgeneration.com/api/currency', {
        params: { base }
    });

    // response.data - это объект вроде { "usd-rub": 88.1562, "eur-rub": 101.3841, "rub-usd": 0.0119 ... }
    const data = response.data as Record<string, number>;

    // Парсим только нужные пары (RUB, USD, EUR)
    return parseRates(base, data);
}

/**
 * Преобразует плоский объект (напр. {"usd-rub": 88.15, "rub-usd": 0.0119})
 * в вид { USD: ..., EUR: ..., RUB: ... },
 * где ключ = валюта, а значение = "сколько base-валюты в 1 этой валюте".
 */
function parseRates(base: string, data: Record<string, number>): RatesData {
    // По умолчанию
    const result: RatesData = { USD: 0, EUR: 0, RUB: 0 };

    // Ставим курс самой базовой валюты к ней же = 1
    if (base === 'RUB') {
        // Например, "usd-rub": 88.15 => значит 1 USD = 88.15 RUB
        // Тогда rates.USD = 88.15
        result.RUB = 1;
        // Если ключа "usd-rub" нет, будет undefined => лучше поставить 0 или NaN
        result.USD = data['usd-rub'] ?? 0;
        result.EUR = data['eur-rub'] ?? 0;

    } else if (base === 'USD') {
        // При base=USD
        // "eur-usd": 1.15 => 1 EUR = 1.15 USD => rates.EUR = 1.15
        // "rub-usd": 0.0119 => 1 RUB = 0.0119 USD => rates.RUB = 0.0119
        result.USD = 1;
        result.EUR = data['eur-usd'] ?? 0;
        result.RUB = data['rub-usd'] ?? 0;

    } else if (base === 'EUR') {
        // При base=EUR
        // "usd-eur": 0.8888 => 1 USD = 0.8888 EUR => rates.USD = 0.8888
        // "rub-eur": 0.0105 => 1 RUB = 0.0105 EUR => rates.RUB = 0.0105
        result.EUR = 1;
        result.USD = data['usd-eur'] ?? 0;
        result.RUB = data['rub-eur'] ?? 0;
    }

    return result;
}
