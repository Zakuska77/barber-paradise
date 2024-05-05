import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Account() {
  const [userData, setUserData] = useState(null);
  const { userType, id } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/${userType}/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }
        const userData = await response.json();
        setUserData(userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [userType, id]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <p>Name: {userData.Name}</p>
      <p>Email: {userData.Email}</p>
      {/* Display other user details as needed */}
    </div>
  );
}

export default Account;