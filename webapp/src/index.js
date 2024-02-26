import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Footer from './components/Footer';
import Navbar from './components/NavBar';
import AddUser from './components/AddUser';
import Login from './components/Login';
import { AuthProvider } from './components/authcontext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
    <Router>
      <Navbar />
        <Routes>
          <Route path="/addUser" element={<AddUser />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>

      <CssBaseline />
      <Typography component="h1" variant="h5" align="center" sx={{ marginTop: 2 }}>
       Bienvenidos al curso 2024 de arquitectura de software somos el grupo :
      </Typography>
      <Typography component="h2" variant="h5" align="center" sx={{ marginTop: 2 }}>wiq_es04c</Typography>

      <App />
      <Footer />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();