import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // If you're using React Router

function CoiffeurDetails() {
  const [coiffeurData, setCoiffeurData] = useState(null);
  const { id } = useParams(); // If you're using React Router

  useEffect(() => {
    const fetchCoiffeurDetails = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`http://localhost:3000/CoiffeurDetails/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setCoiffeurData(data);
      } catch (error) {
        console.error('Error fetching coiffeur details:', error);
      }
    };

    fetchCoiffeurDetails();
  }, [id]); // Fetch details whenever the coiffeur ID changes

  if (!coiffeurData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Coiffeur Details</h2>
      <p>Username: {coiffeurData.Username}</p>
      <p>Email: {coiffeurData.Email}</p>
      <p>Location: {coiffeurData.Location}</p>
      <p>Profile Pic:
      {coiffeurData.profilePic && (
        <img src={coiffeurData.profilePic} alt="Profile" style={{ maxWidth: "100px", maxHeight: "100px" }} />
      )}</p>

    </div>
  );
}

export default CoiffeurDetails;