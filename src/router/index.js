import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'

import Overview from '../pages/Overview.vue'
import Products from '../pages/Products.vue'
import Orders from '../pages/Orders.vue'
import Settings from '../pages/Settings.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
        children: [
            {
                path: 'overview',
                name: 'Overview',
                component: Overview,
            },
            {
                path: 'products',
                name: 'Products',
                component: Products,
            },
            {
                path: 'orders',
                name: 'Orders',
                component: Orders,
            },
            {
                path: 'settings',
                name: 'Settings',
                component: Settings,
            },
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
