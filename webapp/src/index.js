import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
/*funcion q representa la barra de navegacion superior*/
import Footer from './components/Footer';
import Navbar from './components/NavBar';
import AddUser from './components/AddUser';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  
  <React.StrictMode>
    {/** manjear la direccion a los componentes que hace navBar de register y login */}
    <Router>
      <Navbar />
      <Routes>
        <Route path="/addUser" element={<AddUser />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
    <App />
    
    <Footer></Footer>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
