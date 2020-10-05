export default {
    SET_PRODUCTS(state, payload) {
        state.products = payload;
    },
    SET_ERROR(state, payload = true) {
        state.error = payload;
    },
    CLEAR_ERROR(state) {
        state.error = null;
    }
}