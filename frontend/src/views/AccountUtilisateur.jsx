import InfoAccountUtilisateur from "../components/InfoAccountUtilisateur";
import Favoris from "../components/Favoris";
import React, { useState, useEffect, useContext } from "react";
import { api } from "../api/api";
import { useParams } from "react-router-dom";
function Account() {
    const [data, setData] = useState([]);
    const [favoris, setFavori] = useState([]);
    const [rendevous, setRendevous] = useState([]);
    const params = useParams()

    useEffect(() => {
        fetch(`${api}/clientDetails/${params.id}`)
            .then((res) => res.json())
            .then((data) => setData(data));

        fetch(`${api}/favoriteCoiffeurs/${params.id}`)
            .then((res) => res.json())
            .then((favoris) => setFavori(favoris));

        fetch(`${api}/clientAppointments/${params.id}`)
            .then((res) => res.json())
            .then((rendevous) => setRendevous(rendevous));
    }, []);
    console.log(rendevous);
    return (
        <div className="mx-6 my-4">
            <div className="media">
                <div className="media-left">
                    <figure class="image is-64x64">
                        <img
                            className="is-rounded"
                            src="https://th.bing.com/th/id/R.3eb651283895cb9947f37e4f46f15c54?rik=FcThrL5odaBeuw&riu=http%3a%2f%2flaweisslab.ucsf.edu%2fsites%2fall%2fmodules%2fcustom%2fucsf_person_content_type%2fimages%2fperson-placeholder.png&ehk=6r6jQLTryQmpIOYCNvj9ya%2bZ6AHqQdNtXaHj3gTkN6c%3d&risl=&pid=ImgRaw&r=0"
                            alt="Placeholder image"
                        />
                    </figure>
                </div>
                <div className="media-content">
                    <h1 className="title is-2">Bonjour {data.Username}!</h1>
                </div>
            </div>
            <hr />
            <div className="mb-6 mt-4">
                <InfoAccountUtilisateur
                    Email={data.Email}
                    Password={data.Password}
                    PhoneNumber={data.PhoneNumber} />
            </div>
            <h2 className="title is-2">Favoris</h2>
            <hr />
            <div className="fixed-grid has-6-cols">
                <div className="grid">
                    {favoris.map((item) => (
                        <div className="cell" ket={item.CoiffeurID}>
                            <Favoris Username={item.Username} ShopName={item.ShopName} Location={item.Location} profilePic={item.profilePic} />
                        </div>
                    ))}
                </div>
            </div>
            <h2 className="title is-2">Rendez-vous</h2>
            <hr />
            <div>
                <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                    <thead>
                        <tr>
                            <th>Coiffeur</th>
                            <th>Date</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                       {rendevous.map((item) =>(
                        <tr key={item.AppointmentID}>
                            <td>{item.CoiffeurID}</td>
                            <td>{toString(item.AppointmentDateTime)}</td>
                        </tr>

                       ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Account;
