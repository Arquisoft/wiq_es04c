import React from 'react';
import Navbar from '../navbar/NavBar';
import StartButton from '../startbutton/StartButton';
import Typography from '@mui/material/Typography';
import Footer from '../footer/Footer';
const Home = () => {
  return (
    <div>

   
      <StartButton isLoggedIn={true} />

    </div>
  );
};

export default Home;