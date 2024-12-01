import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllListings = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/listings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export default getAllListings;
