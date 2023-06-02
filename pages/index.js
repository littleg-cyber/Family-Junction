import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Welcome, {user.displayName}! </h1>
      <div>
        <Link href="/family/new" passHref>
          <Button variant="outline-primary">Create a family</Button>
        </Link>
        <Link passHref href="/families">
          <Button variant="outline-primary">View Families</Button>
        </Link>
      </div>

    </div>
  );
}

export default Home;
