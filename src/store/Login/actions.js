import Vue from 'vue';
import api from '../../config/api';

export default {
    async login({commit}, payload){
        commit('CLEAR_ERROR');
        try{
            const {data} = await api.post('/auth', payload);
            localStorage.TOKEN = data.token;
            const decodedToken = Vue.$jwt.decode(data.token);
            api.defaults.headers.common.Authorization = `Bears ${localStorage.TOKEN}`;
            commit('SET_LOGIN', decodedToken);

            console.log("token meu ovo: ", localStorage.TOKEN, decodedToken);
        }
        catch(error) {
            console.log("error do catch: ", error.response.data);
            commit('SET_ERROR', error.response.data);
        }
    }
}