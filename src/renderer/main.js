import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'
import './plugins/iview.js'
import 'iview/dist/styles/iview.css'
import './styles/main.scss'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
