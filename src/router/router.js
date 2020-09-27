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
      path: '/',
      component: Login
    },
    {
      path: '/dashboard',
      component: Dashboard
    },
    {
      path: '/reservation',
      component: Reservation
    },
    {
      path: '/people',
      component: People
    },
    {
      path: '/users',
      component: Users
    },
    {
      path: '/config',
      component: Config
    },
  ]
});

export default router;