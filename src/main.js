import sum from "./js/sum"
import "./css/index.css"
import "./css/iconfont.css"
import _ from 'lodash';

console.log(_.join(['Another', 'module', 'loaded!'], ' '));

console.log(sum(1, 2));
import Vue from 'vue';
import App from './App.vue';

new Vue({
  render: h => h(App),
}).$mount('#app');
