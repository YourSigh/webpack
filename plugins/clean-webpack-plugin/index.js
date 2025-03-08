class CleanWebpackPlugin {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        console.log('CleanWebpackPlugin');
        const outputPath = compiler.options.output.path;
        const fs = compiler.outputFileSystem;
        compiler.hooks.emit.tapAsync('CleanWebpackPlugin', (compilation, callback) => {
            this.removeFiles(fs, outputPath);
            callback();
        })
    }

    removeFiles(fs, filepath) {
        const files = fs.readdirSync(filepath);
        files.forEach(file => {
            const path = `${filepath}/${file}`;
            fs.statSync(path).isDirectory() ? this.removeFiles(fs, path) : fs.unlinkSync(path);
        })
    }
}

module.exports = CleanWebpackPlugin;