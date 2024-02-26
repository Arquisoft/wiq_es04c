import React ,{useContext} from 'react';
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';
import { AuthContext } from './authcontext';


const Navbar = () => {
  //sacar el valor para ver si esta logeado o no 
  const { isLoggedIn } = useContext(AuthContext);

  return(
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
    <div className="collapse navbar-collapse" id="my-navbarColor01">
      <Link to="/" className="navbar-brand">
        <img src="LogoSaberYganar.png" alt="Logo" />
      </Link>
    </div>

    <div className="collapse navbar-collapse" id="my-navbarColor02">
        <ul className="navbar-nav justify-content-end">
          {!isLoggedIn ? (
            <>
              <li className="nav-item">
                <Link to="/addUser" className="nav-link">
                  <i className="fas fa-sign-in-alt" style={{ fontSize: '16px' }}></i>
                  <span>Registrarse</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  <i className="fas fa-sign-in-alt" style={{ fontSize: '16px' }}></i>
                  <span>Iniciar sesión</span>
                </Link>
              </li>
            </>
          ) : (
            <>
            <li className="nav-item">
              <Link to="/logout" className="nav-link">
                <i className="fas fa-sign-in-alt" style={{ fontSize: '16px' }}></i>
                <span>logout</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/history" className="nav-link">
                <i className="fas fa-sign-in-alt" style={{ fontSize: '16px' }}></i>
                <span>historial</span>
              </Link>
            </li>
            </>

            
          )}
        </ul>
      </div>
  </nav>
  );
          };

export default Navbar;
