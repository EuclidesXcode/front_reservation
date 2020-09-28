import Vue from 'vue';
import Vuex from 'vuex';
import Login from './login/index';
import User from './user/index';
import Clients from './clients/index';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        Login,
        User,
        Clients
    }
});

export default store;