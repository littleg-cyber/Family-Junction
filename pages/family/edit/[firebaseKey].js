import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleFamily } from '../../../api/familyData';
import FamilyForm from '../../../components/forms/FamilyForm';

export default function EditFamily() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleFamily(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<FamilyForm obj={editItem} />);
}
