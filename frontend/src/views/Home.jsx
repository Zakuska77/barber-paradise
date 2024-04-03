<<<<<<< HEAD
<<<<<<< HEAD
import { useState, useEffect } from "react";
=======
import React, { useState, useEffect, useContext } from "react";
>>>>>>> 88659767bd5984875350f2e0eeb3cf021035a30f
=======
import React, { useState, useEffect, useContext } from "react";
>>>>>>> 88659767bd5984875350f2e0eeb3cf021035a30f
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
      .then((data) => {
        setData(data);
        setFilteredData(data);
      });
  }, []);

  function handleClick(id) {
    navigate(`/Information/${id}`);
  }

  function filter() {
    if (inputData.length > 0) {
      setFilteredData(
        data.filter((item) =>
          item.ShopName.toLowerCase().includes(inputData.toLowerCase())
        )
      );
    } else if (inputData.length ===0) {
      setFilteredData(data);
    }else{
      console.log('error', inputData)
    }
  }
  console.log(localStorage.getItem('token'));

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
      {filteredData.map((item) => (
        <div
          className="grid is-col-min-10"
          key={item.CoiffeurID}
          onClick={() => handleClick(item.CoiffeurID)}
        >
          <CoiffeurCarte
            ShopName={item.ShopName}
            Username={item.Username} // Corrected prop name
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
