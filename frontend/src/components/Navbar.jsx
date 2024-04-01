import { Link } from 'react-router-dom';
import React from 'react'
export default function Menu() {
  const token = localStorage.getItem('token');
  function deconnexion() {
    localStorage.removeItem('token')
    console.log(localStorage.getItem('token'));
  }
  return (
    <nav className="navbar has-background-info has-text-white-ter">
      <div className="navbar-item">
        <Link to="/" className="navbar-item">
          <span className="icon-text">
            <span className="icon">
              <i className="fas fa-home"></i>
            </span>
            <span>Home</span>
          </span>
        </Link>
        <Link to="/Information" className="navbar-item">
          Information
        </Link>
        <Link to="/Account" className="navbar-item">
          Account
        </Link>
        <button class="button is-danger" onClick={()=> deconnexion()}>Deconnection</button>
      </div>

    </nav>
  );
}
