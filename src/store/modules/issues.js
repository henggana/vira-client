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
      const { newIssuesList, isActive } = payload;
      let currentActiveIssues = context.state.data.filter(issue => issue.isActive);
      let currentBacklogIssues = context.state.data.filter(issue => !issue.isActive);

      console.log('isActive', isActive);
      console.log('newIssuesList', newIssuesList);

      if (isActive) {
        currentActiveIssues = newIssuesList;
        currentActiveIssues.forEach((item) => {
          item.isActive = true;
        });
      } else {
        currentBacklogIssues = newIssuesList;
        currentBacklogIssues.forEach((item) => {
          item.isActive = false;
        });
      }

      currentActiveIssues.forEach((item, index) => {
        item.order = index + 1;
      });

      currentBacklogIssues.forEach((item, index) => {
        item.order = index + 1;
      });

      const newIssues = currentActiveIssues.concat(currentBacklogIssues);
      context.commit('updateListIssues', newIssues);
    },
  },
};
