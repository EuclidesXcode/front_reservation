export default {
    SET_CLIENT(state, payload) {
        state.clients = payload;
    },
    SET_ERROR(state, payload = true) {
        console.log('antes', payload, state.error)
        state.error = payload;
        console.log('depois', payload, state.error)
    },
    CLEAR_ERROR(state) {
        state.error = null;
    }
}