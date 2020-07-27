import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store/index'
import chartJs from 'chart.js'

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  chartJs,
  render: h => h(App)
}).$mount('#app')
