/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewEventDetails } from '../../api/mergedData';

export default function ViewEvent() {
  const [eventDetails, setEventDetails] = useState({});
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  // TODO: make call to API layer to get the data
  useEffect(() => {
    viewEventDetails(firebaseKey).then(setEventDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-row">
      <div className="d-flex flex-column">
        <img src={eventDetails.image} alt={eventDetails.eventTitle} style={{ width: '300px' }} />
        <h3>
          {eventDetails.eventTitle}
        </h3>
      </div>
      <div className="d-flex flex-column text-black ms-5 details" style={{ width: '300px' }}>

        <h5>
          Date: {eventDetails.eventDate}
        </h5>
        <h5>
          Location: {eventDetails.eventLocation}
        </h5>
        <h5>
          Description: {eventDetails.eventDescription}
        </h5>
      </div>
    </div>
  );
}
