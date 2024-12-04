import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const checkUser = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/users/checkuser/${uid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        if (response.status === 404) {
          throw new Error('User not found');
        }
        throw new Error('Unexpected error');
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });

const registerUser = (userInfo) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    })
      .then((response) => resolve(response.json()))
      .then((data) => resolve(data))
      .catch(reject);
  });

export { checkUser, registerUser };
