import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import vuetify from './plugins/vuetify';


Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  theme: {
    themes: {
      light: {
        primary: '#3f51b5',
        secondary: '#b0bec5',
        accent: '#8c9eff',
        error: '#b71c1c',
      },
      dark: {
        primary: '#4caf50',
      },
    },
  },
  render: h => h(App)
}).$mount('#app')
