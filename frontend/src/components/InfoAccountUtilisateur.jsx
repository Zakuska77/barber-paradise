import React from 'react'

const InfoAccountUtilisateur = ({ Email, Password, PhoneNumber }) => {
    return (
        <>
            <div className="card">
                <div className="card-content">
                    <div className="media">
                        <div className="media-left">
                        </div>
                        <div className="media-content">
                            <p className="title is-6">{Email}</p>
                        </div>
                    </div>
                    <div className="content">
                        <p className="subtitle is-6">Mots de passe : {Password}</p>
                        <p className="subtitle is-6">Telephone : {PhoneNumber}</p>
                    </div>
                </div>
            </div>
        </>
    )
}


export default InfoAccountUtilisateur;
