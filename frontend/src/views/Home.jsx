import { useState, useEffect } from "react";
import { api } from "../api/api";
import CoiffeurCarte from "../components/CoiffeurCarte";
import { useNavigate } from "react-router-dom";

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();
  const [inputData, setInputData] = useState("");

  useEffect(() => {
    fetch(`${api}/Coiffeurs`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  function handleClick(id) {
    navigate(`/Information/${id}`);
  }

  function filter() {
    if (inputData.length > 0) {
      setFilteredData(
        data.filter((item) =>
          item.Username.toLowerCase().includes(inputData.toLowerCase())
        )
      );
    }
  }

  return (
    <>
      <div className="field has-addons mt-4 mb-4">
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Nom Coiffeur"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />
        </div>
        <div className="control">
          <button className="button is-info" onClick={filter}>
            Recherche
          </button>
        </div>
      </div>

      {(inputData.length > 0 ? filteredData : data).map((item) => (
        <div
          className="grid is-col-min-10"
          key={item.CoiffeurID}
          onClick={() => handleClick(item.CoiffeurID)}
        >
          <CoiffeurCarte
            ShopName={item.ShopName}
            Username={item.Username}
            Availability={item.Availability}
            Location={item.Location}
            ImageShop={item.ImageShop}
          />
        </div>
      ))}
    </>
  );
}

export default App;
