import Vue from 'vue';
import api from '../../config/api';

export default {
    async Login({commit}, payload){
        commit('CLEAR_ERROR');
        try{
            const {data} = await api.post('/auth', payload);
            localStorage.TOKEN = data.token;
            const decodedToken = Vue.$jwt.decode(data.token);
            api.defaults.headers.common.Authorization = `Bears ${localStorage.TOKEN}`;
            commit('SET_LOGIN', decodedToken);

        }
        catch(error) {
            commit('SET_ERROR', error.respomse.data.msg);
        }
    }
}