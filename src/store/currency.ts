import { defineStore } from 'pinia';
import { fetchRates } from '@/services/currencyApi';

export const useCurrencyStore = defineStore('currency', {
    state: () => ({
        baseCurrency: 'RUB',
        rates: {} as Record<string, number>,
        loading: false,
        error: null as string | null
    }),

    actions: {
        async setBaseCurrency(currency: string) {
            this.baseCurrency = currency;
            await this.loadRates();
        },

        async loadRates() {
            this.loading = true;
            this.error = null;
            try {
                // Загружаем курсы для baseCurrency
                const data = await fetchRates(this.baseCurrency);
                this.rates = data;
            } catch (err) {
                this.error = 'Ошибка при загрузке курсов валют';
            } finally {
                this.loading = false;
            }
        }
    },

    getters: {
        /**
         * Возвращает курс указанной валюты относительно baseCurrency.
         * Например, если baseCurrency='RUB' и currency='USD',
         * то getRate('USD') может вернуть 91.45 (означает 1 USD = 91.45 RUB).
         */
        getRate: (state) => (currency: string) => {
            return state.rates[currency] ?? 0;
        }
    }
});
