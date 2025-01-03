import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getSavedListings = (userId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/saved-listings/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const addSavedListing = (payload, listingId, userId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/saved-listings/${listingId}/add/${userId}`, {
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

const removeSavedListing = (listingId, userId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/saved-listings/${listingId}/remove/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getSavedListings, addSavedListing, removeSavedListing };
