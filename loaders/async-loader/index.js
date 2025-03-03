module.exports = function(content, map, meta) {
    // 异步loader content: 上一个loader的返回值 map: sourceMap meta: 其他信息
    console.log('async-loader');
    const callback = this.async(); // 获取异步回调函数
    setTimeout(() => {
        callback(null, content, map, meta);
    }, 1000);
}