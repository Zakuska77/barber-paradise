import React from 'react'

const InfoAccountCoiffeur = ({ Email, Location, ShopName, PhoneNumber }) => {
    return (

        <div class="media-right">
            <p class="title is-4">Shop:{ShopName}</p>
            <p class="subtitle is-6"><span className="icon">
            <i className="fas fa-location-dot"></i>
            </span>{Location}</p>
            <p className="subtitle is-6"><span className="icon">
            <i className="fas fa-envelope"></i>
            </span>{Email}</p>
            <p className="subtitle is-6"><span className="icon">
            <i className="fas fa-phone"></i></span>{PhoneNumber}</p>
        </div>
    )
}
{/* <i class="fa-solid fa-envelope"></i> */}
export default InfoAccountCoiffeur
