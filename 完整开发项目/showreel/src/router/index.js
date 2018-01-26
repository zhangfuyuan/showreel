import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/views/index'
import Error from '@/views/error'
import Two_Home from '@/components/two/home'
import Two_Works from '@/components/two/works'

Vue.use(Router)

export default new Router({
  routes: [
    // 根路径
    {
      path: '/',
      name: 'Index',
      redirect: '/index',
      component: Index
    },
    // 首页
    {
      path: '/index',
      redirect: '/index/home',
      name: 'Home',
      component: Index,
      children: [
        {
          path: 'home',
          component: Two_Home
        },
        {
          path: 'works',
          component: Two_Works
        }
      ]
    },

    // 404
    {
      path: '*',
      name: 'NotFound',
      component: Error
    }
  ]
})
