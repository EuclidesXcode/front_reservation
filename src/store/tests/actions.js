import api from '../../config/api';

export default {
    async createTest({commit}, payload){
        commit('CLEAR_ERROR');
        try{
            await api.post('/tests', payload);
        }
        catch(error) {
            commit('SET_ERROR', error.response.data);
        }
    },
    async getTest({commit}, payload){
        commit('CLEAR_ERROR');
        try{
            const {data} = await api.post('/tests/get', payload);
            commit('SET_TEST', data.items);
        }
        catch(error) {
            commit('SET_ERROR', error.response.data);
        }
    },
    async deleteTest({commit}, payload){
        commit('CLEAR_ERROR');
        try{
            await api.delete(`/tests/${payload}`);
        }
        catch(error) {
            commit('SET_ERROR', error.response.data);
        }
    }
}