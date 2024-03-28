import { useState, useEffect } from "react";
import { api } from "../api/api";
import CoiffeurCarte from "../components/CoiffeurCarte";

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${api}/Coiffeurs`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const handleLogin = async () => {
    const email = 'test@example.com'; // Replace with actual email
    const password = 'password'; // Replace with actual password
    try {
      const response = await fetch(`${api}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const userData = await response.json();
      console.log(userData);
      // Handle storing token and user ID in localStorage
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  console.log(data);

  return (
    <>
      <h2>Accueil</h2>
      <div className="header">
        <input type="text" className="CoiffeurRechercher" placeholder="Recherche de Coiffeur" />
        <button onClick={handleLogin}>Login</button>
      </div>
      {data.map(item => (
        <div className="grid is-col-min-10" key={item.id}>
          <CoiffeurCarte
            ShopName={item.ShopName}
            nomCoiffeur={item.Username}
            Availability={item.Availability}
            Location={item.Location}
            ImageShop={item.ImageShop}
          />
        </div>
      ))}
      <button className="button is-danger">Danger</button>
    </>
  );
}

export default Home;