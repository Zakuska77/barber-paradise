import { Link, useNavigate } from 'react-router-dom';
import React from 'react';


export default function Menu() {
  const token = localStorage.getItem('token');
  const userType = localStorage.getItem('userType');
  const userId = localStorage.getItem('userId');
  console.log(userId);
  const navigate = useNavigate()


  function deconnexion() {
    localStorage.clear();
    // localStorage.removeItem('debug');
    // localStorage.removeItem('token');
    // localStorage.removeItem('userType');
    // localStorage.removeItem('userId');
    // console.log(localStorage.getItem('token'));
    navigate("/");

  }


  return (
    <nav className="navbar has-background-info has-text-white-ter">
      <div className="navbar-item">
        <Link to="/" className="navbar-item has-text-black">
          <span className="icon-text">
            <span className="icon">
              <i className="fas fa-home"></i>
            </span>
            <span>Home</span>
          </span>
        </Link>
        {userType === "coiffeur" ? (
          <Link to={`/AccountCoiffeur/${userId}`} className="navbar-item has-text-black">
            Account
          </Link>
        ) :
          (
            <Link to={`/AccountUtilisateur/${userId}`} className="navbar-item has-text-black">
              Account
            </Link>
          )}
        {userType === "coiffeur" && (
          <Link to="/ModifyCoiffeurAvailability" className="navbar-item has-text-black">
            Modify Schedule
          </Link>
        )}
      </div>
      <div className="navbar-end p-2">
        {token ? (
          <button className="button is-danger" onClick={deconnexion}>
            Logout
          </button>
        ) : (
          <Link to="/Login" className="navbar-item has-text-black">
            Login
          </Link>
        )}


      </div>
    </nav>
  );
}