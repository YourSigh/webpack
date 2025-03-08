class BannerWebpackPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.emit.tapAsync('BannerWebpackPlugin', (compilation, callback) => {
            console.log('BannerWebpackPlugin')
            // 1.获取即将输出的资源文件，compilation.assets，过滤出js文件
            // 2.遍历所有输出资源，在前面加上banner注释
            const nameArray = [];
            for (let filename in compilation.assets) {
                if (filename.endsWith('.js')) {
                    nameArray.push(filename);
                }
            }
            const annotation = `/* Author: ${this.options.author} */`;
            nameArray.forEach(filename => {
                const source = compilation.assets[filename];
                const ans = annotation + '\n' + source.source();
                const asset = {
                    source: () => ans,
                    size: () => ans.length,
                }
                compilation.assets[filename] = asset;
            })
            callback();
        })
    }
}

module.exports = BannerWebpackPlugin;