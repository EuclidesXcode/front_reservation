export default {
    SET_SCHEDULES(state, payload) {
        state.schedules = payload;
    },
    SET_ERROR(state, payload = true) {
        state.error = payload;
    },
    CLEAR_ERROR(state) {
        state.error = null;
    }
}