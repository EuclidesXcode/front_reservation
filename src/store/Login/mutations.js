export default {
    SET_LOGIN(state, payload) {
        state.login = payload;
    },
    SET_ERROR(state, payload = true) {
        console.log('antes', payload, state.errorPass)
        state.errorPass = payload;
        console.log('depois', payload, state.errorPass)
    },
    CLEAR_ERROR(state) {
        state.errorPass = null;
    }
}