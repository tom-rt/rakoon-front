import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _acf75c74 = () => interopDefault(import('../pages/home.vue' /* webpackChunkName: "pages/home" */))
const _b62a64dc = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _2fc47273 = () => interopDefault(import('../pages/subscribe.vue' /* webpackChunkName: "pages/subscribe" */))
const _4979ab0a = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/home",
    component: _acf75c74,
    name: "home"
  }, {
    path: "/login",
    component: _b62a64dc,
    name: "login"
  }, {
    path: "/subscribe",
    component: _2fc47273,
    name: "subscribe"
  }, {
    path: "/",
    component: _4979ab0a,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
