import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ServicesPlugin from './services/ServicesPlugin'
import './registerServiceWorker'

Vue.config.productionTip = false

Vue.use(ServicesPlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
