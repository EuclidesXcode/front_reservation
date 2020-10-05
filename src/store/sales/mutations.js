export default {
    SET_SALES_PRODUCTS(state, payload) {
        state.salesProducts = payload;
    },
    SET_SALES_SERVICES(state, payload) {
        state.salesServices = payload;
    },
    SET_ERROR(state, payload = true) {
        state.error = payload;
    },
    CLEAR_ERROR(state) {
        state.error = null;
    }
}