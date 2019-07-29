import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      redirect: '/home/index/0',
      component: require('@/pages/home').default,
      children: [
        {
          path: 'index/:index',
          name: 'content',
          component: () => import('@/pages/home/content')
        }
      ]
    },
    {
      path: '/defult',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})
