import { getFamilyEvents, getSingleFamily, deleteSingleFamily } from './familyData';
import { getSingleEvent, deleteSingleEvent } from './eventsData';

const viewEventDetails = (eventFirebaseKey) => new Promise((resolve, reject) => {
  getSingleEvent(eventFirebaseKey)
    .then((eventObject) => {
      getSingleFamily(eventObject.family_id)
        .then((familyObject) => {
          resolve({ familyObject, ...eventObject });
        });
    }).catch((error) => reject(error));
});

const viewFamilyDetails = (familyFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleFamily(familyFirebaseKey), getFamilyEvents(familyFirebaseKey)])
    .then(([familyObject, familyEventsArray]) => {
      resolve({ ...familyObject, events: familyEventsArray });
    }).catch((error) => reject(error));
});

const deleteFamilyEvents = (familyId) => new Promise((resolve, reject) => {
  getFamilyEvents(familyId).then((eventsArray) => {
    console.warn(eventsArray, 'Family Events');
    const deleteEventPromises = eventsArray.map((event) => deleteSingleEvent(event.firebaseKey));

    Promise.all(deleteEventPromises).then(() => {
      deleteSingleFamily(familyId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export { viewEventDetails, deleteFamilyEvents, viewFamilyDetails };
