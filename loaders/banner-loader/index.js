const schema = require('./schema.json');

module.exports = function(content, map, meta) {
    console.log('banner-loader');
    // schema对options的验证规则
    const options = this.getOptions(schema);  // 获取配置项

    const prefix = `
        /**
         * @author ${options.author}
         */
    `
    console.log(prefix + content);
    return prefix + content;
}