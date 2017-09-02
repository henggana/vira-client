export default {
  state: {
    isAuthenticated: false,
    isLoggingIn: false,
  },
  mutations: {
    loginRequest(state) {
      state.isLoggingIn = true;
    },
    loginSuccess(state) {
      state.isLoggingIn = false;
      state.isAuthenticated = true;
    },
    loginFailure(state) {
      state.isLoggingIn = false;
      state.isAuthenticated = false;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
  actions: {
    login(context) {
      context.commit('loginRequest');
      setTimeout(() => context.commit('loginSuccess'), 300);
    },
  },

};
