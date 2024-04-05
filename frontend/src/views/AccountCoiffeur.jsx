import InfoAccountCoiffeur from "../components/InfoAccountCoiffeur";
import React, { useState, useEffect, useContext } from "react";
import { api } from "../api/api";
import { useParams } from "react-router-dom";

function AppInfo() {
    const [data, setData] = useState([]);
    const [rendevous, setRendevous] = useState([]);
    const params = useParams()
    useEffect(() => {

        fetch(`${api}/CoiffeurDetails/${params.id}`)
            .then((res) => res.json())
            .then((data) => setData(data));

    }, []);


    useEffect(() => {
        fetch(`${api}/coiffeurAppointments/${params.id}`)
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
                            src={data.profilePic}
                            alt="Placeholder image"
                        />
                    </figure>
                </div>
                <div className="media-content">
                    <h1 className="title is-2">Bonjour {data.Username}!</h1>
                </div>
            </div>
            <hr />
            <div className="m-4">

                <InfoAccountCoiffeur

                    Email={data.Email}
                    PhoneNumber={data.PhoneNumber}
                    ShopName={data.ShopName}
                    Location={data.Location}
                />
            </div>
            <h3 className="title is-2">Rendez-vous</h3>
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
                        {rendevous.map((item) => (
                            <tr key={item.AppointmentID}>
                                <td>{item.ClientID}</td>
                                <td>{item.AppointmentDateTime}</td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    )

}

export default AppInfo;