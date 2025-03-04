module.exports = function(content) {
    console.log('clean-log-loader');
    return content.replace(/console\.log\(.*\);?/gm, '');
}