import React from 'react'

const Favoris = ({ Username, ShopName, Location,profilePic }) => {
    return (
        <div className="card">
            <div className="card-image">
                <figure className="image is-256x256">
                    <img
                        src={profilePic}
                        alt="Placeholder image"
                    />
                </figure>
            </div>
            <div className="card-content">
                <p className="title is-4">{Username}</p>
                <p className="subtitle is-6">{ShopName}</p>
                <p className="is-size-7	">{Location}</p>
            </div>
        </div>
    )
}

export default Favoris
