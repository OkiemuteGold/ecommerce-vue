import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import "popper.js";
import "bootstrap";
import "./assets/app.scss";
import jQuery from 'jquery';
import { fbase } from './firebase';
import VueFirestore from 'vue-firestore';
import Swal from 'sweetalert2';

Vue.use(VueFirestore, {
    key: 'id',         // the name of the property. Default is '.key'.
    enumerable: true  //  whether it is enumerable or not. Default is true.
});

Vue.use(VueFirestore);

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

window.$ = window.jQuery = jQuery;
window.Swal = Swal;
window.Toast = Toast;

import ScrollAnimation from "./directives/scroll_animation"
Vue.directive("scroll_animation", ScrollAnimation);

// Vue.filter("stripHTML", function (value) {
//     const div = document.createElement("div")
//     div.innerHTML = value
//     const text = div.textContent || div.innerText || ""
//     return text
// });

Vue.config.productionTip = false

let app;
fbase.auth().onAuthStateChanged(function () {
    if (!app) {
        app = new Vue({
            router,
            store,
            render: h => h(App)
        }).$mount('#app')
    }
})


