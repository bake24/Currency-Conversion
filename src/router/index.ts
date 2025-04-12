import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import ConvertPage from '@/pages/ConvertPage.vue';

const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/convert', name: 'Convert', component: ConvertPage },
    // Неизвестные пути перенаправляем на главную
    { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;

// my-currency-converter-app
// ├── public
// │   └── favicon.ico            # Фавиконка сайта
// ├── src
// │   ├── assets
// │   │   └── scss
// │   │       ├── _mixins.scss   # Миксины
// │   │       ├── _variables.scss# Переменные
// │   │       └── main.scss      # Точка входа для общих стилей (reset, normalize и др.)
// │   ├── components
// │   │   ├── layout
// │   │   │   └── AppHeader.vue
// │   │   ├── ui
// │   │   │   ├── BaseDropdown.vue
// │   │   │   └── BaseInput.vue
// │   │   ├── features
// │   │   │   ├── BaseCurrencySelector.vue
// │   │   │   └── CurrencyConverterForm.vue
// │   │   └── ...
// │   ├── pages
// │   │   ├── HomePage.vue
// │   │   └── ConvertPage.vue
// │   ├── router
// │   │   └── index.ts
// │   ├── services
// │   │   └── currencyApi.ts
// │   ├── store
// │   │   └── currency.ts
// │   ├── App.vue
// │   ├── main.ts
// │   └── env.d.ts               # TS-декларации (если нужно)
// ├── .eslintrc.js
// ├── .gitignore
// ├── index.html
// ├── package.json
// ├── tsconfig.json
// └── vite.config.ts
