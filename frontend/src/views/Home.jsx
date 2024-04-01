import { useState, useEffect } from "react";
import { api } from "../api/api";
import CoiffeurCarte from "../components/CoiffeurCarte";
import { useNavigate } from "react-router-dom";

function App() {
  const [data, setData] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`${api}/Coiffeurs`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  console.log(data)
  function handleClick(id) {
    navigate(`/Information/${id}`)
  }
  return (
    <>
      <div className="field has-addons mt-4 mb-4">
        <div className="control">
          <input className="input" type="text" placeholder="Nom Coiffeur" />
        </div>
        <div className="control">
          <button className="button is-info">
            Recherche
          </button>
        </div>
      </div>
      {data.map(item => (
        <div className="grid is-col-min-10" key={item.CoiffeurID} onClick={() => handleClick(item.CoiffeurID)}>
          <CoiffeurCarte
            ShopName={item.ShopName}
            Username={item.Username}  // Corrected prop name
            Availability={item.Availability} // Added prop
            Location={item.Location}
            ImageShop={item.ImageShop}
          />
        </div>
      ))}
    </>
  );
}

export default App;