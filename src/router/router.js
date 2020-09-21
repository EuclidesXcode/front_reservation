import Vue from 'vue';
import Router from 'vue-router';
import SalesUser from '../components/Sales/SalesUser.vue'
import Reservation from '../components/Reservation/Reservation.vue'
import People from '../components/People/People.vue'
import Users from '../components/Users/Users.vue'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: SalesUser
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
    }
  ]
});

export default router;