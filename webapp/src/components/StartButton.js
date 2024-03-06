import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './authcontext'; // Cambia AuthProvider a AuthContext

const StartButton = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(isLoggedIn ? "/game" : "/login");
  };

  return (
    <button onClick={handleClick} className="start-button">
      Start Game
    </button>
  );
};

export default StartButton;