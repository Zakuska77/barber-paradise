import React from 'react';

const Favoris = ({ Username, ShopName, Location, profilePic, handleDelete }) => {
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
                <p className="subtitle is-6"><strong>{ShopName}</strong> - {Location} </p>
                <button className="button is-danger" onClick={() => handleDelete()}>
                    <span className="icon is-small">
                        <i className="fa-solid fa-trash"></i>
                    </span>
                    <p>Supprimer</p>
                </button>
            </div>
        </div>
    );
};

export default Favoris;
