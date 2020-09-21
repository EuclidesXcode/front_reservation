import Vue from 'vue';
import Router from 'vue-router';
import SalesUser from '../components/Sales/SalesUser.vue'
import Products from '../components/Products/Products.vue'
import People from '../components/People/People.vue'
import Sales from '../components/Sales/Sales.vue'
import Financial from '../components/Financial/Financial.vue'
import Report from '../components/Report/Report.vue'
import Users from '../components/Users/Users.vue'
import Admin from '../components/Admin/Admin.vue'
import Config from '../components/Config/Config.vue'
import Imports from '../components/Imports/Imports.vue'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: SalesUser
    },
    {
      path: '/products',
      component: Products
    },
    {
      path: '/people',
      component: People
    },
    {
      path: '/sales',
      component: Sales
    },
    {
      path: '/financial',
      component: Financial
    },
    {
      path: '/Report',
      component: Report
    },
    {
      path: '/users',
      component: Users
    },
    {
      path: '/admin',
      component: Admin
    },
    {
      path: '/config',
      component: Config
    },
    {
      path: '/imports',
      component: Imports
    }
  ]
});

export default router;