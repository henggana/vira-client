import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import auth from './modules/auth';
import issues from './modules/issues';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    name: 'Vira app name that you get from the store',
  },
  modules: {
    auth,
    issues,
  },
  plugins: [createLogger()],
});
