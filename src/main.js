import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import vuetify from './plugins/vuetify';
import store from './store/index';
import VueJWT from 'vuejs-jwt';
import VueMask from 'v-mask'

Vue.config.productionTip = false
Vue.use(VueMask, {
  placeholders: {
    '#': null,       // passing `null` removes default placeholder, so `#` is treated as character
    D: /\d/,         // define new placeholder
    Я: /[\wа-яА-Я]/, // cyrillic letter as a placeholder
  }
})
Vue.use(VueJWT);
new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
