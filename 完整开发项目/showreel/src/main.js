// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false

// vuex
import Vuex from 'vuex'
import store from './vuex/store'
Vue.use(Vuex)

// scss
import '@/assets/scss/app.scss'

// element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// vue-fullpage
import KsVueFullpage from 'ks-vue-fullpage'
Vue.use(KsVueFullpage)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
