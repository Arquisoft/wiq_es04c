const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'questionservice-mysql',  // Nombre del servicio de MySQL en Docker Compose
  user: 'root',
  password: 'tu_contraseña',
  database: 'questionservice_db',
});
connection.connect((err) => {
    if (err) {
      console.error('Error de conexión a la base de datos:', err);
    } else {
      console.log('Conexión exitosa a la base de datos MySQL');
    }
  });