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

const getListingById = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/listings/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getAllListings, getListingById };
