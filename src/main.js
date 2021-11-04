import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './plugins/mavon_editor'
import './assets/css/global.css'
import axios from 'axios'
import 'lib-flexible'
import './plugins/my_player'

Vue.config.productionTip = false

// axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1'
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1'

axios.interceptors.request.use(config => {
  config.headers.Authorization = 'Bearer ' + window.sessionStorage.getItem('token')
  return config
})

Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
