export default {
    SET_LOGIN(state, payload) {
        state.login = payload;
    },
    SET_ERROR(state, payload = true) {
        state.errorPass = payload;
    },
    CLEAR_ERROR(state) {
        state.errorPass = null;
    }
}