import { Link } from 'react-router-dom';
import React from 'react'
export default function Menu() {
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
        <Link to="/Account" className="navbar-item">
          Account
        </Link>

        <Link to="/Login" className="navbar-item">

          Connection
        </Link>
      </div>

    </nav>
  );
}
