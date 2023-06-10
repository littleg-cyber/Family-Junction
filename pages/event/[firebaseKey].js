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
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={eventDetails.image} alt={eventDetails.eventTitle} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {eventDetails.eventTitle} by {eventDetails.familyObject?.familyName}
        </h5>
      </div>
    </div>
  );
}
