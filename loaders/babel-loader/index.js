const babel = require("@babel/core");
const schema = require("./schema.json");
module.exports = function (content) {
  const options = this.getOptions(schema);
  const callback = this.async();

  // 使用babel转换代码
  babel.transform(content, options, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result.code);
    }
  });
};
