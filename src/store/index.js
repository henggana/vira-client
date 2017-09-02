import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    name: 'Vira app name that you get from the store',
  },
  modules: {
    auth,
  },
});
