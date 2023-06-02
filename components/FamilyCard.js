import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleFamily } from '../api/familyData';

export default function FamilyCard({ familyObj, onUpdate }) {
  // FOR DELETE, WE NEED TO REMOVE THE BOOK AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE BOOKS
  const deleteThisFamily = () => {
    if (window.confirm(`Delete ${familyObj.familyName}?`)) {
      deleteSingleFamily(familyObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={familyObj.image} alt={familyObj.familyName} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{familyObj.familyName}</Card.Title>
        {/* DYNAMIC LINK TO VIEW THE BOOK DETAILS  */}
        <Link href={`/family/${familyObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE BOOK DETAILS  */}
        <Link href={`/family/edit/${familyObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisFamily} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

FamilyCard.propTypes = {
  familyObj: PropTypes.shape({
    image: PropTypes.string,
    familyName: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
