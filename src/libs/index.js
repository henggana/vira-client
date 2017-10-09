const fakes = {
  admin: {
    username: 'admin',
  },
  issues: [
    {
      id: 1,
      title: 'Issue #1',
      order: 1,
      isActive: true,
    },
    {
      id: 2,
      title: 'Issue #2',
      order: 2,
      isActive: true,
    },
    {
      id: 3,
      title: 'Issue #3',
      order: 3,
      isActive: true,
    },
    {
      id: 4,
      title: 'Issue #4',
      order: 4,
      isActive: true,
    },
    {
      id: 5,
      title: 'Issue #5',
      order: 5,
      isActive: true,
    },
    {
      id: 6,
      title: 'Issue #6',
      order: 1,
      isActive: false,
    },
    {
      id: 7,
      title: 'Issue #7',
      order: 2,
      isActive: false,
    },
    {
      id: 8,
      title: 'Issue #8',
      order: 3,
      isActive: false,
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
