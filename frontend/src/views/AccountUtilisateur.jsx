import InfoAccountUtilisateur from "../components/InfoAccountUtilisateur";
import Favoris from "../components/Favoris";
import React, { useState, useEffect, useContext } from "react";
import { api } from "../api/api";
import { useNavigate, useParams } from "react-router-dom";
function Account() {
    const [data, setData] = useState([]);
    const [favoris, setFavori] = useState([]);
    const [rendevous, setRendevous] = useState([]);
    const [filteredRdv, setfilteredRdv] = useState([]);
    const [pressed, setPressed] = useState(false);
    const params = useParams()
    const navigate = useNavigate()

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;


    useEffect(() => {
        fetch(`${api}/clients/${params.id}`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                setData(data[0])
            });

        fetch(`${api}/clients/favorites/${params.id}`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((favoris) => setFavori(favoris));

        fetch(`${api}/clients/appointments/${params.id}`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((rendevous) => {
                setRendevous(rendevous);
                setfilteredRdv(rendevous.filter(rendevou => {
                    return rendevou.Month > month || (rendevou.Month === month && rendevou.Day > day);
                }))
            });
    }, []);

    async function deleteFavorite(CoiffeurID) {
        await fetch(`${api}/clients/favorites/${params.id}/${CoiffeurID}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Fetch the updated list of favorites after deletion
        const updatedFavoris = await fetch(`${api}/clients/favorites/${params.id}`, {
            method: "GET",
        }).then((res) => res.json());

        // Update the state with the updated list of favorites
        setFavori(updatedFavoris);
    }
    console.log
    console.log(rendevous)


    async function deleteAppointment(appointmentId) {
        await fetch(`${api}/clients/DeleteAppointment/${appointmentId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const updatedAppointments = await fetch(`${api}/clients/appointments/${params.id}`, {
            method: "GET",
        }).then((res) => res.json());

        setRendevous(updatedAppointments);

        const updatedFilteredRdv = filteredRdv.filter(item => item.AppointmentID !== appointmentId);
        setfilteredRdv(updatedFilteredRdv);
    }


    async function oldRendezVous() {
        const filteredRendevous = rendevous.filter(rendevou => {
            return rendevou.Month < month || (rendevou.Month === month && rendevou.Day < day);
        });
        setfilteredRdv(filteredRendevous);
        setPressed(!pressed)
    }
    async function FutureRendezVous() {
        const filteredRendevous = rendevous.filter(rendevou => {
            return rendevou.Month > month || (rendevou.Month === month && rendevou.Day > day);
        });
        setfilteredRdv(filteredRendevous);
        setPressed(!pressed)
    }

    console.log(rendevous)
    // todo use current date
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
                    <div class="columns">
                        <div class="column is-four-fifths">
                            <h1 className="title is-2">Bonjour {data.Username}!</h1>
                        </div>
                        <div class="column">
                            <div className="dropdown is-hoverable">
                                <div className="dropdown-trigger">
                                    <button className="button is-white" aria-haspopup="true" aria-controls="dropdown-menu4">
                                        <i className="fa-solid fa-wallet p-2"></i>
                                        <span className="is-size-4">{data.balance} $</span>
                                    </button>
                                </div>
                                <div className="dropdown-menu" id="dropdown-menu4" role="menu">
                                    <div className="dropdown-content">
                                        <div className="dropdown-item">
                                            <p>
                                                <button type="button" className="" onClick={() => navigate(`/piggy-bank/${params.id}`)} >Ajouter Credit</button>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
                        <div className="cell" key={item.fav_id}>
                            <Favoris
                                Username={item.Username}
                                ShopName={item.ShopName}
                                Location={item.Location}
                                profilePic={item.profilePic}
                                handleDelete={() => deleteFavorite(item.CoiffeurID[0])}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <h2 className="title is-2">Rendez-vous</h2>
            <hr />
            <div>
                {pressed ? <button className="btn" onClick={() => oldRendezVous()}>Anciens Rendez-Vous</button> : <button className="btn" onClick={() => FutureRendezVous()}>Futures Rendez-Vous</button>}
                {/* <button className="btn" onClick={() => oldRendezVous()}>Anciens Rendez-Vous</button>
                <button className="btn" onClick={() => FutureRendezVous()}>Futures Rendez-Vous</button> */}
                <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                    <thead>
                        <tr>
                            <th>Coiffeur</th>
                            <th>Date</th>

                        </tr>
                    </thead>
                    <tbody>
                        {filteredRdv.map((item) => (
                            <tr key={item.AppointmentID}>
                                <td>{item.CoiffeurID}</td>
                                <td>{item.Day}/{item.Month}/{item.Year} What time :{(item.AppointmentTime)} h</td>
                                <td>
                                    {!pressed && (
                                        <button
                                            style={{
                                                backgroundColor: '#e74c3c',
                                                color: '#fff',
                                                border: 'none',
                                                padding: '5px 5px',
                                                borderRadius: '5px',
                                                cursor: 'pointer',
                                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                            }}
                                            onClick={() => deleteAppointment(item.AppointmentID)}
                                        >
                                            Cancel Reservation
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* <h2 className="title is-2" onClick={() => ol}>Old Rendez-vous</h2>
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
                        {oldRdv.map((item) => (
                            <tr key={item.AppointmentID}>
                                <td>{item.CoiffeurID}</td>
                                <td>{item.Day}/{item.Month}/{item.Year} What time :{(item.AppointmentTime)} h</td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div> */}
        </div>
    )
}
export default Account;
