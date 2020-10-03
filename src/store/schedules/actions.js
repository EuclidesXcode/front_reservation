import api from '../../config/api';

export default {
    async createSchedules({commit}, payload){
        commit('CLEAR_ERROR');
        try{
            await api.post('/schedules/', payload);
            console.log("payload : ", payload);
        }
        catch(error) {
            commit('SET_ERROR', error.response.data);
        }
    },
    async updateSchedule({commit}, payload){
        commit('CLEAR_ERROR');
        try{
            await api.post(`/schedules/${payload}`, payload);
            console.log("payload : ", payload);
        }
        catch(error) {
            commit('SET_ERROR', error.response.data);
        }
    },
    async getSchedules({commit}, payload){
        commit('CLEAR_ERROR');
        try{
            const {data} = await api.post('/schedules/get', payload);
            console.log("data items: ", data)
            commit('SET_SCHEDULES', data.items);
        }
        catch(error) {
            commit('SET_ERROR', error.response.data);
        }
    },
    async deleteSchedule({commit}, payload){
        commit('CLEAR_ERROR');
        try{
            await api.delete(`/schedules/${payload}`);
        }
        catch(error) {
            commit('SET_ERROR', error.response.data);
        }
    }
}