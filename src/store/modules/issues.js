import { fakeRequest } from '../../libs/index';

export default {
  state: {
    isListIssuesRequest: false,
    isListIssuesSuccess: false,
    isListIssuesFailure: false,
    data: [],
  },
  getters: {
    activeIssues(state) {
      return state.data.filter(item => item.isActive);
    },
    backlogIssues(state) {
      return state.data.filter(item => !item.isActive);
    },
  },
  mutations: {
    listIssuesRequest(state) {
      state.isListIssuesRequest = true;
      state.isListIssuesSuccess = false;
      state.isListIssuesFailure = false;
    },
    listIssuesSuccess(state, response) {
      state.isListIssuesRequest = false;
      state.isListIssuesSuccess = true;
      state.isListIssuesFailure = false;
      state.data = response.data;
    },
    listIssuesFailure(state) {
      state.isListIssuesRequest = false;
      state.isListIssuesSuccess = false;
      state.isListIssuesFailure = true;
    },
    updateListIssues(state, newIssues) {
      state.data = newIssues;
    },
    clearIssues(state) {
      state.data = [];
    },
  },
  actions: {
    fetchListIssues(context) {
      context.commit('listIssuesRequest');

      const payload = {};

      fakeRequest('/api/v1/issues', payload)
      .then((response) => {
        context.commit('listIssuesSuccess', response);
      })
      .catch((response) => {
        context.commit('listIssuesFailure', response);
      });
    },
    moveIssue(context, payload) {
      const { proxyActiveIssues, proxyBacklogIssues } = payload;

      proxyActiveIssues.forEach((item) => {
        item.isActive = true;
      });

      proxyBacklogIssues.forEach((item) => {
        item.isActive = false;
      });

      const newIssues = proxyActiveIssues.concat(proxyBacklogIssues);
      context.commit('updateListIssues', newIssues);
    },
  },
};
