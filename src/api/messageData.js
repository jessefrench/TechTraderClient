import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getMessagesByUserId = (userId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/messages/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const getMessagesBySellerId = (userId, sellerId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/messages/${userId}/sellers/${sellerId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const createMessage = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/messages`, {
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

const updateMessage = (messageId, payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/messages/${messageId}`, {
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

export { getMessagesByUserId, getMessagesBySellerId, createMessage, updateMessage };
