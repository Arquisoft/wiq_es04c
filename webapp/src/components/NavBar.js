import React from 'react';
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
    <div className="collapse navbar-collapse" id="my-navbarColor01">
      <Link to="/" className="navbar-brand">
        <img src="LogoSaberYganar.png" alt="Logo" />
      </Link>
    </div>

    <div className="collapse navbar-collapse" id="my-navbarColor02">
      <ul className="navbar-nav justify-content-end">
        <li className="nav-item">
          <Link to="/addUser" className="nav-link">
            <i className="fas fa-sign-in-alt" style={{ fontSize: '16px' }}></i>
            <span>Registrarse</span>
          </Link>
        </li>
        <li className="nav-item">
          <a href="/login" className="nav-link">
            <i className="fas fa-sign-in-alt" style={{ fontSize: '16px' }}></i>
            <span>Iniciar sesión</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
