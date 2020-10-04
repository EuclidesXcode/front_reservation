export default {
    SET_USER(state, payload) {
        state.user = payload;
    },
    SET_ERROR(state, payload = true) {
        state.error = payload;
    },
    CLEAR_ERROR(state) {
        state.error = null;
    }
}