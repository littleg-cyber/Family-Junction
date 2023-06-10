/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getFamilyEvents } from '../../api/familyData';
import { viewFamilyDetails } from '../../api/mergedData';
import EventCard from '../../components/EventCard';

export default function Events() {
  // Set a state for families
  const [events, setEvents] = useState([]);
  const router = useRouter();
  const [familyDetails, setFamilyDetails] = useState([]);

  const { firebaseKey } = router.query;
  const getAllFamilyEvents = () => {
    getFamilyEvents(firebaseKey).then(setEvents);
  };

  // make the call to the API to get all the books on component render
  useEffect(() => {
    viewFamilyDetails(firebaseKey).then(setFamilyDetails);
  }, [firebaseKey]);

  useEffect(() => {
    getAllFamilyEvents();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firebaseKey]);

  return (
    <>
      <div className="text-white ms-5 details">
        <h5>
          Family: {familyDetails.familyName}
        </h5>
      </div>
      <div className="text-center my-4">
        <Link href="/event/new" passHref>
          <Button variant="primary">Add An Event</Button>
        </Link>
        <div className="d-flex flex-wrap">
          {events.map((event) => (
            <EventCard key={event.firebaseKey} eventObj={event} onUpdate={getAllFamilyEvents} />
          ))}
        </div>

      </div>
    </>
  );
}
