const os = require("os");
// Node.js的核心模块，专门用来处理文件路径
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { VueLoaderPlugin } = require('vue-loader');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const WorkBoxPlugin = require('workbox-webpack-plugin');
const path = require("path");

// cpu核数
const threads = os.cpus().length;

module.exports = {
  // 入口
  // 相对路径和绝对路径都行
  entry: { // 多入口
    index: {
      import: './src/main.js',
      dependOn: 'shared', // 依赖于shared
    },
    another: {
      import: './src/another.js',
      dependOn: 'shared', // 依赖于shared
    },
    shared: 'lodash', // 共享的模块
  },
  // 输出
  output: {
    // path: 文件输出目录，必须是绝对路径
    // path.resolve()方法返回一个绝对路径
    // __dirname 当前文件的文件夹绝对路径
    path: path.resolve(__dirname, "../dist"),
    // filename: 输出文件名
    filename: 'js/[name].[contenthash].bundle.js',
    clean: true, // 自动清空上次打包内容
    chunkFilename: 'js/[name].[contenthash].chunk.js', // 输出的chunk文件名
    assetModuleFilename: 'assets/[name].[contenthash][ext]', // 输出的资源文件名
  },
  // 加载器 
  module: {
    rules: [
      {
        // 单次匹配的文件
        oneOf: [
          {
            test: /\.css$/, // 匹配css文件的正则表达式
            use: [ // 执行顺序是从右往左执行 先 css-loader 再执行 style-loader
              "vue-style-loader", // 处理vue文件中的style标签
              // MiniCssExtractPlugin.loader, // 提取css成单独文件
              "css-loader" // 处理css文件
            ],
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
            include: path.resolve(__dirname, "../src"), // 只处理src目录下的文件
            use: [
              "sync-loader",
              "async-loader",
              "raw-loader",
              "pitch-loader",
              "clean-log-loader",
              {
                loader: 'banner-loader',
                options: {
                  author: '绿桶',
                }
              },
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
                  plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
                  presets: ['@babel/preset-env'], // 预设：转码规则（用bable开发环境本来预设的）
                },
              },
            ],
          }
        ]
      },
      {
        test: /\.vue$/, // 匹配vue文件的正则表达式
        use: [
          {
            loader: 'vue-loader', // 处理vue文件
            options: {
              compilerOptions: {
                preserveWhitespace: false, // 去除空格
              },
              cacheDirectory: path.resolve(__dirname, "../node_modules/.cache/vue-loader"), // 缓存目录
            }
          }
        ],
      },
    ],
  },
  // 插件
  plugins: [
    new ESLintWebpackPlugin({
      // 检测哪些文件
      context: path.resolve(__dirname, "../src"),
      cache: true, // 开启缓存
      cacheLocation: path.resolve(__dirname, "../node_modules/.cache/eslintcache"), // 缓存目录
      threads, // 开启多进程和设置进程数量 
    }),
    new HtmlWebpackPlugin({
      // 以public/index.html为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
      template: path.resolve(__dirname, "../public/index.html"),
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
      chunkFilename: "css/[name].[contenthash].chunk.css",
    }),
    new WorkBoxPlugin.GenerateSW({
      // 这些选项帮助快速启用 ServiceWorkers
      // 不允许遗留任何“旧的” ServiceWorkers
      clientsClaim: true,
      skipWaiting: true,
      maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 设置为 5 MB
    })
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
    runtimeChunk: { // 生成运行时代码块, 用于管理模块的加载和执行
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
    splitChunks: {
      chunks: 'all', // 自动提取和分割代码中的公共部分到单独的 shared.bundle.js 或 vendors.bundle.js 中
      cacheGroups: { // 定义如何对模块进行分组和缓存
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        vue: { // 提取vue相关的模块
          test: /[\\/]node_modules[\\/]vue[\\/]/,
          name: 'vue',
          chunks: 'all',
        },
        default: { // 其他模块
          minSize: 0, // 最小大小为0，即所有模块都符合条件
          minChunks: 2, // 最小引用次数为2，即至少被引用两次的模块才会被提取
          priority: -20, // 优先级为-20，即比其他缓存组的优先级更低
          reuseExistingChunk: true, // 重用已存在的块，即如果已经存在一个与当前模块匹配的块，则不会创建新的块
        },
      },
    },
    minimizer: [
      new CssMinimizerPlugin(), // 压缩 CSS
      new TerserWebpackPlugin({
        parallel: threads, // 开启多进程和设置进程数量
      }),
      // new ImageMinimizerPlugin({ // 压缩图片
      //   minimizer: {
      //     implementation: ImageMinimizerPlugin.imageminMinify,
      //     options: {
      //       plugins: [
      //         ["imagemin-gifsicle", { interlaced: true }], // 压缩 GIF 图片
      //         ["imagemin-jpegtran", { progressive: true }], // 压缩 JPEG 图片
      //         ["imagemin-optipng", { optimizationLevel: 5 }], // 压缩 PNG 图片
      //         [
      //           "imagemin-svgo", // 压缩 SVG 图片
      //           {
      //             plugins: [
      //               "preset-default", // 使用默认插件
      //               "prefixIds", // 添加前缀
      //               {
      //                 name: "sortAttrs", // 排序属性
      //                 params: {
      //                   xmlnsOrder: "alphabetical", // 按属性名排序
      //                 },
      //               },
      //             ],
      //           },
      //         ]
      //       ]
      //     }
      //   }
      // })
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.vue', '.ts', '.jsx', '.tsx', '.scss', '.css'], // 自动补全文件扩展名
    modules: [path.resolve(__dirname, '../src'), 'node_modules'], // 解析模块的路径
    alias: { // 别名
      '@': path.resolve(__dirname, '../src'),
    },
  },
  devtool: 'source-map', // 生成 source map 文件
  resolveLoader: { // 解析 loader 的路径
    modules: ['node_modules', path.resolve(__dirname, '../loaders')]
  }
};
