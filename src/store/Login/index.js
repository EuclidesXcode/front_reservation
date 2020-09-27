import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import state from './states';

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}