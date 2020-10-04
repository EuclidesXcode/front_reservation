import Vue from 'vue';
import Vuex from 'vuex';
import Login from './Login/index';
import User from './user/index';
import Clients from './clients/index';
import Payment from './payment/index';
import Tests from './tests/index';
import Schedules from './schedules/index';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        Login,
        User,
        Clients,
        Payment,
        Tests,
        Schedules
    }
});

export default store;
