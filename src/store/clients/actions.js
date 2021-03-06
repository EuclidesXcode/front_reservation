import api from '../../config/api';

export default {
    async createClient({commit}, payload){
        commit('CLEAR_ERROR');
        try{
            await api.post('/clients/createClient', payload);
        }
        catch(error) {
            commit('SET_ERROR', error.response.data);
        }
    },
    async updateClient({commit}, payload){
        commit('CLEAR_ERROR');
        try{
            await api.post(`/clients/${payload}`, payload);
        }
        catch(error) {
            commit('SET_ERROR', error.response.data);
        }
    },
    async getClients({commit}, payload){
        commit('CLEAR_ERROR');
        try{
            const {data} = await api.post('/clients/get', payload);
            commit('SET_CLIENT', data.items);
        }
        catch(error) {
            commit('SET_ERROR', error.response.data);
        }
    },
    async deleteClient({commit}, payload){
        commit('CLEAR_ERROR');
        try{
            await api.delete(`/clients/${payload}`);
        }
        catch(error) {
            commit('SET_ERROR', error.response.data);
        }
    }
}