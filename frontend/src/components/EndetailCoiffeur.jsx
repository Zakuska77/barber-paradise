import React from 'react'

const InfoCoiffeur = ({ ImageShop, ShopName, Location, Availability, Username, Profilpic,PhoneNumber,Email,Service}) => {
    return (
        <>
        <div className="card">
        <div className="card-image">
            <figure className="image is-4by3">
            <img src={Profilpic} />
            </figure>
        </div>
        <div className="card-content">
            <div className="media">
            <div className="media-left">
                <figure className="image is-48x48">
                <img
                            src={ImageShop}
                            alt="Placeholder image"
                        />
                </figure>
            </div>
            <div className="media-content">
            <p className="title is-2">{ShopName}</p>
            <p className="subtitle is-6">Adress : {Location}</p>
            </div>
            </div>
           
                </div>
            </div>
            <div className="card-content">
                <div className="media">
                    <div className="media-left">
                    </div>
                    <div className="media-content">
                        <p className="title is-2">{ShopName}</p>
                    </div>
                </div>

                <div className="content">
                    <p className="subtitle is-4">Nom Coiffeur : {Username}</p>

                    <p className="subtitle is-6">Disponibiliter : {Availability}
                    <p className="subtitle is-6">Numero: {PhoneNumber}</p>
                    <p className="subtitle is-6"> Email: {Email}</p>
                    <p className="subtitle is-6"> Service : {Service}</p>

                    </p>
                </div>
            </div>




        </>
    )
    }


export default InfoCoiffeur;
