/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getFamilies } from '../api/familyData';
import FamilyCard from '../components/FamilyCard';

export default function Families() {
  // Set a state for families
  const [families, setFamilies] = useState([]);

  // create a function that makes the API call to get all the families
  const getAllTheFamilies = () => {
    getFamilies().then(setFamilies);
  };

  // make the call to the API to get all the books on component render
  useEffect(() => {
    getAllTheFamilies();
  }, []);

  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        {/* map over families here using FamilyCard component */}
        {families.map((family) => (
          <FamilyCard key={family.firebaseKey} familyObj={family} onUpdate={getAllTheFamilies} />
        ))}
      </div>
      <Link href="/family/new" passHref>
        <Button variant="outline-dark">+ New Family</Button>
      </Link>
    </div>
  );
}
