import api from '../../config/api';

export default {
    async createPayment({commit}, payload){
        commit('CLEAR_ERROR');
        try{
            await api.post('/payment', payload);
        }
        catch(error) {
            commit('SET_ERROR', error.response.data);
        }
    },
    async getPayment({commit}, payload){
        commit('CLEAR_ERROR');
        try{
            const {data} = await api.post('/payment/get', payload);
            commit('SET_PAYMENT', data.items);
        }
        catch(error) {
            commit('SET_ERROR', error.response.data);
        }
    },
    async deletePayment({commit}, payload){
        commit('CLEAR_ERROR');
        try{
            await api.delete(`/payment/${payload}`);
        }
        catch(error) {
            commit('SET_ERROR', error.response.data);
        }
    }
}