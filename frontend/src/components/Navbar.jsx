import { Link } from 'react-router-dom';

export default function Menu() {
  return (
    <nav className="navbar is-primary">
      <div className="navbar-start">
        <Link to="/" className="navbar-item">
          Home
        </Link>
        <Link to="/page01" className="navbar-item">
          page01
        </Link>
        <Link to="/page02" className="navbar-item">
          page02
        </Link>
      </div>

    </nav>
  );
}
