const fakes = {
  admin: {
    username: 'admin',
  },
  issues: [
    {
      id: 1,
      title: 'Issue #1',
      order: 1,
    },
    {
      id: 2,
      title: 'Issue #2',
      order: 2,
    },
    {
      id: 3,
      title: 'Issue #3',
      order: 3,
    },
    {
      id: 4,
      title: 'Issue #4',
      order: 4,
    },
    {
      id: 5,
      title: 'Issue #5',
      order: 5,
    },
  ],
};


const getResponse = (path) => {
  const response = {
    status: 200,
    data: [],
  };

  switch (path) {
    case '/api/v1/login':
      response.data = fakes.admin;
      break;
    case '/api/v1/issues':
      response.data = fakes.issues;
      break;
    default:
      response.status = 404;
  }

  return response;
};

export const fakeRequest = (path, payload) => (
  new Promise((resolve, reject) => {
    console.log(payload);
    if (!path.length) {
      return reject();
    }

    setTimeout(() => {
      resolve(getResponse(path));
    }, 300);

    return null;
  })
);

export default {
  fakeRequest,
};
