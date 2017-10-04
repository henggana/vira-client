import { fakeRequest } from '../../libs/index';

export default {
  state: {
    isListIssuesRequest: false,
    isListIssuesSuccess: false,
    isListIssuesFailure: false,
    data: [],
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
    moveIssue(context, newIssues) {
      newIssues.forEach((issue, index) => {
        issue.order = index + 1;
      });
      context.commit('updateListIssues', newIssues);
    },
  },
};
