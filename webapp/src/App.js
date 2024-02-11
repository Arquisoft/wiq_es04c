// React es una biblioteca de JavaScript para hacer aplicaciones web una sola página
// Una página de React está hecha de componentes, y cada componente puede cambiar dinámicamente
// Con JS normal usariámos $Ajax para cambiar elementos de la página. En React se cambian solos al cambiar los estados.
import React, { useState } from 'react';
import AddUser from './components/AddUser';
import Login from './components/Login';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

// Un componente se declara como una función, en este caso se llama App
function App() {
  /*
  Esto es un estado. Es una especie de atributo que al modificarlo altera el componente.
  Para obtenerlo se usa useState(valor inicial) y te devuelve
  el estado (showLogin) y la función necesaria para cambiar el valor (setShowLogin).
  */
  const [showLogin, setShowLogin] = useState(true);

  // Cuando el usuario hace click en el link de login o register
  // se cambia el valor de showLogin
  // y la página se actualiza mostrando el componente Login o el AddUser
  const handleToggleView = () => {
    setShowLogin(!showLogin);
  };

  // La función tiene que devolver un elemento HTML o un componente React.
  // El elemento puede tener cosas anidadas, pero no se puede devolver 2 elementos separados
  // en el return
  // Dentro del return ya no es lenguaje HTML, es JSX
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Typography component="h1" variant="h5" align="center" sx={{ marginTop: 2 }}>
        WIQ_ES04C
      </Typography>
      {/* Esto muestra el componente Login si showLogin es true, y AddUser en caso contrario */}
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
    
    //No puedo poner esto por ejemplo
    //<div></div>
    
  );
}

export default App;
