import api from '../../config/api';

export default {
    async createSchedules({commit}, payload){
        commit('CLEAR_ERROR');
        try{
            await api.post('/schedule/post/', payload);
        }
        catch(error) {
            commit('SET_ERROR', error.response.data);
        }
    },
    async updateSchedule({commit}, payload){
        commit('CLEAR_ERROR');
        try{
            await api.post(`/schedule/${payload}`, payload);
        }
        catch(error) {
            commit('SET_ERROR', error.response.data);
        }
    },
    async getSchedules({commit}, payload){
        commit('CLEAR_ERROR');
        try{
            const {data} = await api.post('/schedule/get', payload);
            commit('SET_SCHEDULES', data.items);
        }
        catch(error) {
            commit('SET_ERROR', error.response.data);
        }
    },
    async deleteSchedule({commit}, payload){
        commit('CLEAR_ERROR');
        try{
            await api.delete(`/schedule/${payload}`);
        }
        catch(error) {
            commit('SET_ERROR', error.response.data);
        }
    }
}