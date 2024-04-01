import React from 'react'

const CoiffeurCarte = ({ ImageShop, ShopName, Location, Availability, Username }) => {
    return (
        <>

            <div className="card">
                <div className="card-image">
                    <figure className="image is-3by2" >
                        <img
                            src={ImageShop}
                            alt="Placeholder image"
                        />
                    </figure>
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
                    <p className="subtitle is-6">Adress : {Location}</p>
                    <p className="subtitle is-6">Disponibiliter : {Availability}

                    </p>
                </div>
            </div>




        </>

    )
}

export default CoiffeurCarte