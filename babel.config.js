module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          chrome: "80",
          ie: "9",
        },
        corejs: "3", // 解决不能够兼容 promise 问题
        useBuiltIns: "usage", // 根据配置的浏览器兼容，以及代码中使用到的 api 进行引入 polyfill 按需添加
      },
    ],
  ],
};