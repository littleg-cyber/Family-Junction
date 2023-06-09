import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createFamily, updateFamily } from '../../api/familyData';

const initialState = {
  image: '',
  familyName: '',
};

function FamilyForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
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
      updateFamily(formInput)
        .then(() => router.push('/families'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createFamily(payload).then(() => {
        router.push('/families');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-black mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Family</h2>
      {/* family name */}
      <FloatingLabel controlId="floatingInput1" label="Family Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Family Name"
          name="familyName"
          value={formInput.familyName}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Family Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      {/* SUBMIT BTN */}
      <Button variant="warning" type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Family</Button>
    </Form>
  );
}

FamilyForm.propTypes = {
  obj: PropTypes.shape({
    familyName: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

FamilyForm.defaultProps = {
  obj: initialState,
};

export default FamilyForm;
