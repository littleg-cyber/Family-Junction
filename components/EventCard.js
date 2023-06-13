import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleEvent } from '../api/eventsData';

export default function EventCard({ eventObj, onUpdate }) {
  // FOR DELETE, WE NEED TO REMOVE THE BOOK AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE BOOKS
  const deleteThisEvent = () => {
    if (window.confirm(`Delete ${eventObj.eventTitle}?`)) {
      console.warn('eventObj', eventObj);
      deleteSingleEvent(eventObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Img variant="top" src={eventObj.image} alt={eventObj.eventTitle} style={{ height: '400px' }} />
        <Card.Title>{eventObj.eventTitle}</Card.Title>
        {/* DYNAMIC LINK TO VIEW THE BOOK DETAILS  */}
        <Link href={`/event/${eventObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE BOOK DETAILS  */}
        <Link href={`/event/edit/${eventObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisEvent} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

EventCard.propTypes = {
  eventObj: PropTypes.shape({
    eventTitle: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
