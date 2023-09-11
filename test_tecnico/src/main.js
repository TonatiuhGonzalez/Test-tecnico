import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import '@fortawesome/fontawesome-free/css/all.css'
import router from './router'
import VModal from 'vue-js-modal'

Vue.use(Buefy)

new Vue({
  el: '#app',
  router,
  VModal,
  render: (h) => h(App)
})
