module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          chrome: "80",
          ie: "9",
        },
        corejs: "3",
        useBuiltIns: "usage",
      },
    ],
  ],
};