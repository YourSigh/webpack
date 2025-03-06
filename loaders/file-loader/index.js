const loaderUtils = require('loader-utils');

module.exports = function(content) {
    // 根据文件内容生成hash名
    const interpolation = loaderUtils.interpolateName(this, "[hash].[ext][query]", {
        content
    });

    // 指定输出目录
    const outputPath = `images/${interpolation}`;

    // 将文件输出到指定目录
    this.emitFile(outputPath, content);

    // 返回module.exports = "文件路径"
    return `module.exports = "${outputPath}"`;
}

module.exports.raw = true;