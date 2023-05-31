import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

//  GET ALL events
const getFamilies = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/families/.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getSingleFamily = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/family/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createFamily = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/family.json`, {
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

const deleteSingleFamily = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/family/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateFamily = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/family/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getFamilyEvents = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/events.json?orderBy="family_id"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});
export {
  getFamilies,
  updateFamily,
  createFamily,
  deleteSingleFamily,
  getSingleFamily,
  getFamilyEvents,
};
