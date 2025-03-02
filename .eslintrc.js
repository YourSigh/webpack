module.exports = {
    extends: ["plugin:vue/vue3-essential", "eslint:recommended"], // 继承的规则
    plugins: ["vue"], // 插件
    env: {
        browser: true, // 支持浏览器环境
        node: true, // 支持Node.js环境
        es6: true, // 支持ES6语法
    },
    parserOptions: {
        ecmaVersion: 2020, // 支持最新的ES语法
        sourceType: "module", // 支持ES模块
        parser: "babel-eslint", // 使用babel-eslint解析器
    },
    rules: {
        "no-console": "off", // 关闭控制台输出
        "no-debugger": "off", // 关闭调试器
    },
}