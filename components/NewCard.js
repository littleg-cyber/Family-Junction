import React from 'react';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';

export default function NewCard() {
  return (
    <>
      <Link href="/family/new" passHref>
        <Card style={{ width: '18rem', margin: '10px ' }}>
          <Card.Body>
            +
          </Card.Body>
        </Card>
      </Link>
    </>
  );
}
