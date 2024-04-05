import { Link } from 'react-router-dom';
import React from 'react';


export default function Menu() {
  const token = localStorage.getItem('token');
  const userType = localStorage.getItem('userType');


  function deconnexion() {
    localStorage.removeItem('debug');
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    console.log(localStorage.getItem('token'));
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
        <Link to="/Information" className="navbar-item has-text-black">
          Information
        </Link>
        <Link to="/Account" className="navbar-item has-text-black">
          Account
        </Link>
        {token ? (
          <button className="button is-danger" onClick={deconnexion}>
            Logout
          </button>
        ) : (
          <Link to="/Login" className="navbar-item has-text-black">
            Login
          </Link>
        )}
        {userType === "coiffeur" && (
          <Link to="/ModifyCoiffeurAvailability" className="navbar-item has-text-black">
            Modify Schedule
          </Link>
        )}
      </div>
    </nav>
  );
}