const os = require("os");
// Node.js的核心模块，专门用来处理文件路径
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { VueLoaderPlugin } = require('vue-loader');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const path = require("path");

// cpu核数
const threads = os.cpus().length;

module.exports = {
  // 入口
  // 相对路径和绝对路径都行
  entry: { // 多入口
    index: {
      import: './src/main.js',
      dependOn: 'shared',
    },
    another: {
      import: './src/another.js',
      dependOn: 'shared',
    },
    shared: 'lodash',
  },
  // 输出
  output: {
    // path: 文件输出目录，必须是绝对路径
    // path.resolve()方法返回一个绝对路径
    // __dirname 当前文件的文件夹绝对路径
    path: path.resolve(__dirname, "dist"),
    // filename: 输出文件名
    filename: '[name].[contenthash].bundle.js',
    clean: true, // 自动清空上次打包内容
  },
  // 加载器 
  module: {
    rules: [
      {
        // 单次匹配的文件
        oneOf: [
          {
            test: /\.css$/, // 匹配css文件的正则表达式
            use: [MiniCssExtractPlugin.loader, "css-loader"], // 执行顺序是从右往左执行 先 css-loader 再执行 style-loader
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
          },
          {
            test: /\.js$/, // 匹配js文件的正则表达式
            include: path.resolve(__dirname, "src"), // 只处理src目录下的文件
            use: [
              {
                loader: "thread-loader", // 开启多进程
                options: {
                  workers: threads, // 数量
                }
              },
              {
                loader: "babel-loader",
                options: {
                  cacheDirectory: true, // 开启babel编译缓存
                  cacheCompression: false, // 关闭缓存文件压缩
                  // plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
                },
              },
            ]
          }
        ]
      },
      {
        test: /\.vue$/, // 匹配vue文件的正则表达式
        use: "vue-loader",  
      },
    ],
  },
  // 插件
  plugins: [
    new ESLintWebpackPlugin({
      // 检测哪些文件
      context: path.resolve(__dirname, "src"),
      cache: true, // 开启缓存
      cacheLocation: path.resolve(__dirname, "node_modules/.cache/eslintcache"), // 缓存目录
      threads, // 开启多进程和设置进程数量 
    }),
    new HtmlWebpackPlugin({
      // 以public/index.html为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
      template: path.resolve(__dirname, "public/index.html"),
    }),
    new BundleAnalyzerPlugin({
      // 打包后文件分析插件
      openAnalyzer: false, // 设置为 false 不自动打开浏览器
      analyzerPort: 6666, // 端口号，默认是8888
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      // 输出的css文件名
      filename: "css/[name].[contenthash].css",
    }),
  ],
  // 模式
  mode: "development", // 开发模式
  performance: false, // 关闭性能分析
  devServer: {
    host: "localhost",
    port: "3001",
    open: true,
    hot: true, // 开启热更新
  },
  optimization: {
    moduleIds: 'deterministic', // 生成稳定的模块 ID，确保即使模块内容不变，ID 也不会改变
    runtimeChunk: 'single', // 将运行时代码提取到一个单独的 runtime.bundle.js 文件中
    splitChunks: {
      chunks: 'all', // 自动提取和分割代码中的公共部分到单独的 shared.bundle.js 或 vendors.bundle.js 中
      cacheGroups: { // 定义如何对模块进行分组和缓存
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimizer: [
      new CssMinimizerPlugin(), // 压缩 CSS
      new TerserWebpackPlugin({
        parallel: threads, // 开启多进程和设置进程数量
      }),
    ],
  },
  devtool: 'source-map', // 生成 source map 文件
};
