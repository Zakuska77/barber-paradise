import { useState, useEffect } from "react";
import { api } from "../api/api";
import CoiffeurCarte from "../components/CoiffeurCarte";
function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${api}/Coiffeurs`)
      .then((res) => res.json())
      .then((data) => setData(data));

  }, []);
  console.log(data);
  return (
    <>
      <h2>Acceuil</h2>
      <div className="header">
        <input type="text" className="CoiffeurRechercher" placeholder="Recherche de Coiffeure" />
        <button>Recherche</button>
      </div>
      {data.map(item => (
          <div class="grid is-col-min-10" key={item.id}>
             <CoiffeurCarte
                ShopName={item.ShopName}
                nomCoiffeur={item.Username}
                Availability={item.Availability}
                Location={item.Location}
                ImageShop={item.ImageShop}
              />
          </div>
        ))}
          <button class="button is-danger">Danger</button>

    </>
  );
}
// ImageShop, ShopName, Location, availability, Username 
export default App;
