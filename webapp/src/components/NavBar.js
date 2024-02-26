// En /src/components/Navbar.js
import React from 'react';
import '../styles/Navbar.css'; // Importa tu archivo de estilos si es necesario

const Navbar = () => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
    <div className="collapse navbar-collapse" id="my-navbarColor01">
      <a className="navbar-brand" href="/">
        <img src="/LogoSaberYganar.png" alt="Logo" />
      </a>
     {/*<ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <a className="nav-link" href="/">
            Home
          </a>
        </li>
</ul>*/}
    </div>
  
    <div className="collapse navbar-collapse" id="my-navbarColor02">
      <ul className="navbar-nav justify-content-end">
        <li className="nav-item">
          <a className="nav-link" href="/signup">
            <i className="fas fa-sign-in-alt" style={{ fontSize: '16px' }}></i>
            <span>Registrarse</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/login">
            <i className="fas fa-sign-in-alt" style={{ fontSize: '16px' }}></i>
            <span>Iniciar sesión</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
  
);

export default Navbar;