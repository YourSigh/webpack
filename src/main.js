import sum from "./js/sum"
import "./css/index.css"
import "./css/iconfont.css"
import _ from 'lodash';

console.log(_.join(['Another', 'module', 'loaded!'], ' '));

console.log(sum(1, 2));
import Vue from 'vue';
import App from './App.vue';

document.getElementById('btn').onclick = () => {
  import(/* webpackChunkName: "count" */ './js/count').then(({ default: count }) => {
    console.log(count(1));
  }).catch((err) => {
    console.log(err);
  });
}

new Vue({
  render: h => h(App),
}).$mount('#app');

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}