import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createEvents, updateEvents } from '../../api/eventsData';
import { getFamilies } from '../../api/familyData';

const initialState = {
  image: '',
  eventTitle: '',
  eventDate: '',
  eventLocation: '',
  eventDescription: '',
};

function EventForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [family, setFamilies] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getFamilies().then(setFamilies);
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateEvents(formInput)
        .then(() => router.push(`/event/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createEvents(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateEvents(patchPayload).then(() => {
          router.push('/families');
          // eventually change this to route to family details page
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'}Event</h2>
      {/* event title input */}
      <FloatingLabel controlId="floatingInput1" label="Event Title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Event Title"
          name="eventTitle"
          value={formInput.eventTitle}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Event Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      {/* DATE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Event Date" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Event Date"
          name="eventDate"
          value={formInput.eventDate}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      {/* LOCATION INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Event Location" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Event Location"
          name="eventLocation"
          value={formInput.eventLocation}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      {/* DESCRIPTION INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Event Description" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Event Description"
          name="eventDescription"
          value={formInput.eventDescription}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* FAMILY SELECT  */}
      <FloatingLabel controlId="floatingSelect" label="Family">
        <Form.Select
          aria-label="Family"
          name="family_id"
          onChange={handleChange}
          className="mb-3"
          value={obj.family_id}
          required
        >
          <option value="">Select a Family</option>
          {
            family.map((familyKey) => (
              <option
                key={familyKey.firebaseKey}
                value={familyKey.firebaseKey}
              >
                {familyKey.familyName}
              </option>
            ))
          }
        </Form.Select>

      </FloatingLabel>
      {/* SUBMIT BTN */}
      <Button variant="warning" type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Event</Button>
    </Form>
  );
}

EventForm.propTypes = {
  obj: PropTypes.shape({
    eventTitle: PropTypes.string,
    image: PropTypes.string,
    eventDate: PropTypes.string,
    eventLocation: PropTypes.string,
    eventDescription: PropTypes.string,
    family_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

EventForm.defaultProps = {
  obj: initialState,
};

export default EventForm;
