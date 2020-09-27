import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import vuetify from './plugins/vuetify';
import store from './store/index';
import VueJWT from 'vuejs-jwt';

Vue.config.productionTip = false
Vue.use(VueJWT);
new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
