export default {
    SET_LOGIN(state, payload) {
        state.login = payload;
    },
    SET_ERROR(state, payload) {
        state.error = payload;
    },
    CLEAR_ERROR(state) {
        state.error = null;
    }
}