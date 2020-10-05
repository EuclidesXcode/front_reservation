import api from '../../config/api';

export default {
    async createService({commit}, payload){
        commit('CLEAR_ERROR');
        try{
            await api.post('/services', payload);
        }
        catch(error) {
            commit('SET_ERROR', error.response.data);
        }
    },
    async getServices({commit}, payload){
        commit('CLEAR_ERROR');
        try{
            const {data} = await api.post('/services/get', payload);
            commit('SET_SERVICES', data.items);
        }
        catch(error) {
            commit('SET_ERROR', error.response.data);
        }
    },
    async deleteService({commit}, payload){
        commit('CLEAR_ERROR');
        try{
            await api.delete(`/services/${payload}`);
        }
        catch(error) {
            commit('SET_ERROR', error.response.data);
        }
    }
}