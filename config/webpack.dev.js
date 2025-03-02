// 引入webpack-merge
const { merge } = require("webpack-merge");
// 引入公共配置
const common = require("./webpack.common.js");
// 第一个参数是公共配置 第二个参数是环境里的配置
module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
  },
});
