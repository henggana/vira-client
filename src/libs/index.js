export const fakeRequest = (path, payload) => (
  new Promise((resolve, reject) => {
    if (!path.length) {
      return reject();
    }

    setTimeout(() => {
      const response = {
        status: 200,
        data: {
          payload,
        },
      };
      resolve(response);
    }, 300);

    return null;
  })
);

export default {
  fakeRequest,
};
