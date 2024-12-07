import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllConditions = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/conditions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export default getAllConditions;
