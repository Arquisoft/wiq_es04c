import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Navbar from './components/navbar/NavBar';
import AddUser from './components/adduser/AddUser';
import Login from './components/login/Login';
import { AuthProvider } from './components/authcontext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import StartButton from './components/StartButton';
import Game from './components/game/Game';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>

    
    <AuthProvider>
    <Router>
      <Navbar />
      <Typography component="h1" variant="h5" align="center" sx={{ marginTop: 2 }}>
       Bienvenidos al curso 2024 de arquitectura de software somos el grupo :
      </Typography>
      <Typography component="h2" variant="h5" align="center" sx={{ marginTop: 2 }}>wiq_es04c</Typography>
        <Routes>
          <Route path="/" element={<StartButton isLoggedIn={true} />} />
          <Route path="/addUser" element={<AddUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/game" element={<Game />} />
        </Routes>






      </Router>

      <CssBaseline />

  

      
     
        
    
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();