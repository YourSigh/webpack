// Node.js的核心模块，专门用来处理文件路径
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const path = require("path");

module.exports = {
  // 入口
  // 相对路径和绝对路径都行
  entry: "./src/main.js",
  // 输出
  output: {
    // path: 文件输出目录，必须是绝对路径
    // path.resolve()方法返回一个绝对路径
    // __dirname 当前文件的文件夹绝对路径
    path: path.resolve(__dirname, "dist"),
    // filename: 输出文件名
    filename: "main.js",
    clean: true, // 自动清空上次打包内容
  },
  // 加载器 
  module: {
    rules: [
      {
        test: /\.css$/, // 匹配css文件的正则表达式
        use: ["style-loader", "css-loader"], // 执行顺序是从右往左执行 css-loader 再执行 style-loader
      },
      {
        test: /\.(png|jpg|JPG|gif)$/, // 匹配图片文件的正则表达式
        type: "asset", // 类型是asset
        // 解析器
        parser: {
          dataUrlCondition: { // 小于8kb的图片会被base64处理
            maxSize: 8 * 1024,
          }
        },
        generator: { // 输出图片文件的名称
          // [name] 取文件名 [ext] 取文件扩展名
          // [hash:6] 取图片的hash值的前6位
          filename: "images/[name].[hash:6][ext]",
        }
      },
      {
        test: /\.(eot|ttf|woff2?)$/, // 匹配字体文件的正则表达式
        type: "asset/resource", // 类型是asset/resource
        generator: { // 输出字体文件的名称
          filename: "fonts/[name].[hash:6][ext]",
        }
      }
    ],
  },
  // 插件
  plugins: [
    new ESLintWebpackPlugin({
      // 检测哪些文件
      context: path.resolve(__dirname, "src"),
    })
  ],
  // 模式
  mode: "development", // 开发模式
  performance: false, // 关闭性能分析
};
