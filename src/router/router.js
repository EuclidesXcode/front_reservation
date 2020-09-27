import Vue from 'vue';
import Router from 'vue-router';
import Login from '../components/Login/Login.vue'
import Dashboard from '../components/Dashboard/Index.vue'
import Config from '../components/Config/Index.vue'
import Reservation from '../components/Reservation/Reservation.vue'
import People from '../components/People/People.vue'
import Users from '../components/Users/Users.vue'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: Login,
      meta: {
        showMenu: false
      }
    },
    {
      path: '/dashboard',
      component: Dashboard,
      meta: {
        showMenu: true
      }
    },
    {
      path: '/reservation',
      component: Reservation,
      meta: {
        showMenu: true
      }
    },
    {
      path: '/people',
      component: People,
      meta: {
        showMenu: true
      }
    },
    {
      path: '/users',
      component: Users,
      meta: {
        showMenu: true
      }
    },
    {
      path: '/config',
      component: Config,
      meta: {
        showMenu: true
      }
    },
  ]
});

export default router;