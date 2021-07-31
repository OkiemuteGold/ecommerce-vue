import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import jQuery from 'jquery'
window.$ = window.jQuery = jQuery;

import "popper.js";
import "bootstrap";
// import 'bootstrap/dist/css/bootstrap.css'
// import '../node_modules/bootstrap/dist/css/bootstrap.css';

import "./assets/app.scss";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
