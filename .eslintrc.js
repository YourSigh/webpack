module.exports = {
    extends: ["eslint:recommended"],
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
    },
    rules: {
        "no-console": "off",
        "no-debugger": "off",
    },
}