const axios = function () {
  console.log("axios");
};
axios.prototype.test = '123';

let a = new axios();
console.log(a.test);