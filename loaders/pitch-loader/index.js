module.exports = function(content, map, meta) {
    // pitch-loader content: 上一个loader的返回值 map: sourceMap meta: 其他信息
    console.log('pitch-loader');
    this.callback(null, content, map, meta);
}

module.exports.pitch = function(remainingRequest, previousRequest, data) {
    // remainingRequest: 剩余的loader路径 previousRequest: 上一个loader的路径 data: 上一个loader的返回值
    console.log('pitch-loader');
    /**
     * pitch-loader一旦return了值，就不会再执行后面的loader了。
     * 比如：nomal-loader：1 -> 2 -> 3
     *      pitch-loader：1 -> 2 -> 3
     * 如果pitch-2 return了值，那执行顺序就是pitch-1 -> pitch-2 -> normal-1
     */
    // return 'pitch-loader';
}