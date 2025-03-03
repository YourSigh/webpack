module.exports = function(content, map, meta) {
    // 同步loader content: 上一个loader的返回值 map: sourceMap meta: 其他信息
    console.log('sync-loader');
    this.callback(null, content, map, meta); // 确保返回的是字符串
}