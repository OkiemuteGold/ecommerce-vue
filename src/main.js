import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { fbase } from './firebase'

import jQuery from 'jquery'
window.$ = window.jQuery = jQuery;

import "popper.js";
import "bootstrap";
// import 'bootstrap/dist/css/bootstrap.css'
// import '../node_modules/bootstrap/dist/css/bootstrap.css';

import "./assets/app.scss";

import ScrollAnimation from "./directives/scroll_animation"

Vue.directive("scroll_animation", ScrollAnimation);

Vue.config.productionTip = false

let app = "";

fbase.auth().onAuthStateChanged(function () {
    if (!app) {
        new Vue({
            router,
            store,
            render: h => h(App)
        }).$mount('#app')
    }
})


