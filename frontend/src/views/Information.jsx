
import { useState, useEffect } from "react";
import { api } from "../api/api";
import InfoCoiffeur from "../components/EndetailCoiffeur";
import { useParams } from "react-router-dom";
function App1() {
  /* 
  * Author Kristina
  * it gives details about the Coiffeur
  */
  const [data, setData] = useState([]);
  const params = useParams()
  /*const[services,setServices] = useState([]);*/
  useEffect(() => {
    fetch(`${api}/CoiffeurDetails/${params.id}`)
      .then((res) => res.json())
      .then((data) => setData(data));

  }, []);


  /* useEffect(() => {fetch(`${api}/Service`)
   .then((res) => res.json())
   .then((services) => setServices(services))} ,[])
   console.log(services);*/
  return (
    <>
      <div className="m-4">
        <div className="grid is-col-min-10" key={data.id}>
          <InfoCoiffeur
            ShopName={data.ShopName}
            nomCoiffeur={data.Username}
            Availability={data.Availability}
            Location={data.Location}
            ImageShop={data.ImageShop}
            Email={data.Email}
            PhoneNumber={data.PhoneNumber}
            Service={data.Service}
            profilePic={data.profilePic}
          />
        </div>
        <form className="box mt-4 mb-8 p-2">
          <div>

            <h1 className="title mt-2 mb-2">Reservation</h1>
            <div class="select is-rounded">
              <select>
                <option>Service</option>
                <option>With options</option>
              </select>

              <select>
                <option>Heure</option>
                <option>With options</option>
              </select>
              <button class="button is-success is-dark">Reserver</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
// Im
// ImageShop, ShopName, Location, availability, Username 
export default App1;
