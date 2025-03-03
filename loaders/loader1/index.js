const chalk = require('chalk');

module.exports = function loader1(content, map, meta) {
    console.log(chalk.blue('loader1'));
    this.callback(null, content, map, meta);
}