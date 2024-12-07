import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllCategories = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const createCategory = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const updateCategory = (categoryId, payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/categories/${categoryId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getAllCategories, createCategory, updateCategory };
