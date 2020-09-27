export default {
    SET_LOGIN(state, payload) {
        state.login = payload;
    },
    SET_ERROR(error, payload) {
        state.error = payload;
    },
    CLEAR_ERROR(error) {
        state.error = null;
    }
}