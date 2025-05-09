module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true
    },
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: "@typescript-eslint/parser",
        sourceType: "module",
        ecmaVersion: 2021
    },
    extends: [
        "plugin:vue/vue3-recommended",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier"
    ],
    rules: {
        // Ваши индивидуальные настройки
        "vue/multi-word-component-names": "off"
    }
};
