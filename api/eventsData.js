import { clientCredentials } from "../utils/client";

const endpoint = clientCredentials.databaseURL;

//  GET ALL events
const getEventss = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/events/.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});
