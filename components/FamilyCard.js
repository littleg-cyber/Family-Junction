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
      console.warn('familyObj', familyObj);
      deleteSingleFamily(familyObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <>
      <Link href={`/family/${familyObj.firebaseKey}`} passHref>
        <Card style={{ width: '18rem', margin: '10px' }}>
          <Card.Img variant="top" src={familyObj.image} alt={familyObj.familyName} style={{ height: '400px' }} />
          <Card.Body>
            <Card.Title>{familyObj.familyName}</Card.Title>
            {/* DYNAMIC LINK TO EDIT THE BOOK DETAILS  */}
            <div className="justify-content-end">
              <Link href={`/family/edit/${familyObj.firebaseKey}`} passHref>
                <Button variant="light" size="sm">📝</Button>
              </Link>
              <Button variant="light" size="sm" onClick={deleteThisFamily} className="m-2">
                🗑️
              </Button>
            </div>

          </Card.Body>
        </Card>
      </Link>

    </>

  );
}

FamilyCard.propTypes = {
  familyObj: PropTypes.shape({
    image: PropTypes.string,
    familyName: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
