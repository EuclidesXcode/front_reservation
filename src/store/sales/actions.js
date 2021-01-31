import api from '../../config/api';

export default {
    async createSaleProduct({commit}, payload){
        commit('CLEAR_ERROR');
        try{
            await api.post('/sales/send/product', payload);
        }
        catch(error) {
            commit('SET_ERROR', error.response.data);
        }
    },
    async createSaleService({commit}, payload){
        commit('CLEAR_ERROR');
        try{
            await api.post('/sales', payload);
        }
        catch(error) {
            commit('SET_ERROR', error.response.data);
        }
    },
    async getSalesProducts({commit}, payload){
        commit('CLEAR_ERROR');
        try{
            const {data} = await api.post('/sales/getProducts', payload);
            console.log("o data do get: ", data)
            commit('SET_SALES_PRODUCTS', data.items);
        }
        catch(error) {
            commit('SET_ERROR', error.response.data);
        }
    },
    async getSalesServices({commit}, payload){
        commit('CLEAR_ERROR');
        try{
            const {data} = await api.post('/sales/getSevices', payload);
            commit('SET_SALES_SERVICES', data.items);
        }
        catch(error) {
            commit('SET_ERROR', error.response.data);
        }
    },
    async deleteSaleProduct({commit}, payload){
        commit('CLEAR_ERROR');
        try{
            await api.delete(`/sales/deleteProduct/${payload}`);
        }
        catch(error) {
            commit('SET_ERROR', error.response.data);
        }
    },
    async deleteSaleService({commit}, payload){
        commit('CLEAR_ERROR');
        try{
            await api.delete(`/sales/deleteService/${payload}`);
        }
        catch(error) {
            commit('SET_ERROR', error.response.data);
        }
    }
}