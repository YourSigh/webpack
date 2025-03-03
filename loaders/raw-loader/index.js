module.exports = function(content, map, meta) {
    // 原始loader content: Buffer数据 map: sourceMap meta: 其他信息
    // 一般用来处理二进制文件，如字体文件、图片等。
    console.log('raw-loader');
    return content;
}

module.exports.raw = true; 