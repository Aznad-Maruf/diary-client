import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Diary App</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/form">Add Entry</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/list">Show List</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tags">Tags</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;