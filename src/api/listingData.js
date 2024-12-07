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

const createListing = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/listings`, {
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

const updateListing = (listingId, payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/listings/${listingId}`, {
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

const deleteListing = (listingId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/listings/${listingId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getAllListings, getListingById, createListing, updateListing, deleteListing };
