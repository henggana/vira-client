import Cookies from 'js-cookie';
import { fakeRequest } from '../../libs';

export default {
  state: {
    isAuthenticated: !!Cookies.get('auth'),
    isLoggingIn: false,
    isLoginFailure: false,
    username: '',
    password: '',
  },
  mutations: {
    loginRequest(state) {
      state.isLoggingIn = true;
    },
    loginSuccess(state) {
      state.isLoggingIn = false;
      state.isAuthenticated = true;
      state.isLoginFailure = false;
      state.username = '';
      state.password = '';
    },
    loginFailure(state) {
      state.isLoggingIn = false;
      state.isAuthenticated = false;
      state.isLoginFailure = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
    updateUsername(state, username) {
      state.username = username;
    },
    updatePassword(state, password) {
      state.password = password;
    },
  },
  actions: {
    login(context) {
      context.commit('loginRequest');

      const payload = {
        username: context.state.username,
        password: context.state.password,
      };

      fakeRequest('/api/v1/login', payload)
      .then((response) => {
        console.log('fakeRequested - /api/v1/login - response:', response);

        if (payload.username === 'admin' && payload.password === 'password') {
          const auth = {
            user: {
              username: 'admin',
            },
          };
          Cookies.set('auth', JSON.stringify(auth));
          context.commit('loginSuccess', response);
        } else {
          context.commit('loginFailure', response);
        }
      });
    },
    logout(context) {
      Cookies.remove('auth');
      context.commit('logout');
    },
  },

};
