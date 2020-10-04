export default {
    SET_PAYMENT(state, payload) {
        state.payment = payload;
    },
    SET_ERROR(state, payload = true) {
        state.error = payload;
    },
    CLEAR_ERROR(state) {
        state.error = null;
    }
}