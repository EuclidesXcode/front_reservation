import api from '../../config/api';

export default {
    async createUser({commit}, payload){
        commit('CLEAR_ERROR');
        try{
            await api.post('/user', payload);
        }
        catch(error) {
            console.log("error do catch: ", error.response.data);
            commit('SET_ERROR', error.response.data);
        }
    },
    async getUser({commit}, payload){
        commit('CLEAR_ERROR');
        try{
            const {data} = await api.post('/user/getUsers', payload);
            commit('SET_USER', data.items);
        }
        catch(error) {
            commit('SET_ERROR', error.response.data);
        }
    },
    async deleteUser({commit}, payload){
        commit('CLEAR_ERROR');
        try{
            await api.delete(`/user/${payload}`);
        }
        catch(error) {
            commit('SET_ERROR', error.response.data);
        }
    }
}