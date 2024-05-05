import { useState, useEffect } from "react";
import { api } from "../api/api";
import CoiffeurCarte from "../components/CoiffeurCarte";
import { useNavigate } from "react-router-dom";


function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();
  const [inputData, setInputData] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(`${api}/coiffeurs`, {
        method: "GET",
      
      });
      const data = await response.json();
      setData(data);
      setFilteredData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
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
    } else if (inputData.length === 0) {
      setFilteredData(data);
    } else {
      console.log('error', inputData)
    }
  }
  const userId = localStorage.getItem('userId');
  console.log(userId);

  return (
    <div className="mx-6 my-4">
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
            Email={item.Email} // Added prop
            Location={item.Location}
            ImageShop={item.ImageShop}
          />
        </div>
      ))}
    </div>
  );
}

export default App;
