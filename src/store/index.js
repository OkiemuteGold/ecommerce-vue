import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let cart = window.localStorage.getItem('cart');

export default new Vuex.Store({
    state: {
        cart: cart ? JSON.parse(cart) : [],
    },

    getters: {
        totalPrice: state => {
            let total = 0;
            state.cart.filter((product) => {
                total += (product.productPrice * product.productQuantity);
            });

            return total;
        }
    },

    mutations: {
        addToCart(state, product) {
            let currentProduct = state.cart.find(product => product.productId == product.productId);

            if (currentProduct) {
                currentProduct.productQuantity++;
            } else {
                state.cart.push(product);
            }

            this.commit('saveData');
        },

        saveData(state) {
            window.localStorage.setItem('cart', JSON.stringify(state.cart));
        },

        removeFromCart(state, product) {
            let index = state.cart.indexOf(product);
            state.cart.splice(index, 1);

            this.commit('saveData');
        },
    },

    actions: {
    },

    modules: {
    }
})
