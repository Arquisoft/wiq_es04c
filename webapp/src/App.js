/* import React, { useState } from 'react';
import AddUser from './components/AddUser';
import Login from './components/Login';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

// Un componente se declara como una función, en este caso se llama App
function App() {
  
  //Esto es un estado. Es una especie de atributo que al modificarlo altera el componente.
  //Para obtenerlo se usa useState(valor inicial) y te devuelve
  //el estado (showLogin) y la función necesaria para cambiar el valor (setShowLogin).
  
  const [showLogin, setShowLogin] = useState(true);

  // Cuando el usuario hace click en el link de login o register
  // se cambia el valor de showLogin
  // y la página se actualiza mostrando el componente Login o el AddUser
  const handleToggleView = () => {
    setShowLogin(!showLogin);
  };
  
  // {showLogin ? <Login /> : <AddUser />} muestra el componente Login si showLogin es true, y AddUser en caso contrario
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Typography component="h1" variant="h5" align="center" sx={{ marginTop: 2 }}>
        WIQ_ES04C
      </Typography>
      {showLogin ? <Login /> : <AddUser />}
      <Typography component="div" align="center" sx={{ marginTop: 2 }}>
        {showLogin ? (
          <Link name="gotoregister" component="button" variant="body2" onClick={handleToggleView}>
            Don't have an account? Register here.
          </Link>
        ) : (
          <Link component="button" variant="body2" onClick={handleToggleView}>
            Already have an account? Login here.
          </Link>
        )}
      </Typography>
    </Container>
  );
}

export default App; */
import React from 'react';
import GenerateQuestion from './components/GenerateQuestion'; // Asegúrate de importar GenerateQuestion correctamente
import Login from './components/Login';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function App() {
  return (

  <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Typography component="h1" variant="h5" align="center" sx={{ marginTop: 2 }}>
        Welcome to the 2024 edition of the Software Architecture course
      </Typography>
      {/* Aquí se muestra el componente GenerateQuestion */}
      
      <GenerateQuestion />
    </Container>
  );
}

export default App;
