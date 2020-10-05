import api from '../../config/api';

export default {
    async createProduct({commit}, payload){
        commit('CLEAR_ERROR');
        try{
            await api.post('/products', payload);
        }
        catch(error) {
            commit('SET_ERROR', error.response.data);
        }
    },
    async getProducts({commit}, payload){
        commit('CLEAR_ERROR');
        try{
            const {data} = await api.post('/products/get', payload);
            console.log("meu payload de produtos: ", data.items)
            commit('SET_PRODUCTS', data.items);
        }
        catch(error) {
            commit('SET_ERROR', error.response.data);
        }
    },
    async deleteProduct({commit}, payload){
        commit('CLEAR_ERROR');
        try{
            await api.delete(`/products/${payload}`);
        }
        catch(error) {
            commit('SET_ERROR', error.response.data);
        }
    }
}