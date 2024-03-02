require('dotenv').config();//usado apra que al crear el .env te lo saque del entorno de docker las variables 

const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

//clae encargada de agregar datos a la bd 
class DatabaseManager {
    constructor(config) {
      this.config = config;
      this.connection = null;
    }


async connect() {
    try {
      this.connection = await mysql.createConnection(this.config);
      console.log('Connected to the database');
    } catch (error) {
      console.error('Error connecting to the database:', error.message);
    }
  }
  async disconnect() {
    try {
      await this.connection.end();
      console.log('Disconnected from the database');
    } catch (error) {
      console.error('Error disconnecting from the database:', error.message);
    }
  }
   // Método auxiliar para las comprobaciones
   async validateQuestionData(question, correctAnswer, distractors, questionType) {
    // Aqui se haran validaciones mas adelante en el 1 protopipo ns que poner 
  }

  //este metodo recibe una pregunta la respuesta correcta los disctractores y el tipo de pregunta y lo inserta todo en la bd 
  async addQuestion(question, correctAnswer, distractors, questionType) {
    try {
      // Comenzamos la transacción para que si da errores se vuelva atras 
      await this.connection.beginTransaction();

      // Insertar la pregunta
      const [questionResult] = await this.connection.execute(
        'INSERT INTO Preguntas (pregunta_texto, respuesta_correcta, tipo_pregunta) VALUES (?, ?, ?)',
        [question, correctAnswer, questionType]
      );

      const questionId = questionResult.insertId;


      // Insertar los distractores
      for (const distractor of distractors) {
        await this.connection.execute(
          'INSERT INTO Distractores (texto, preguntado_por) VALUES (?, ?)',
          [distractor, questionType]
        );
      }

      // Hacer commit para confirmar la transacción
      await this.connection.commit();

      console.log('Question added successfully. ID:', questionId);
    } catch (error) {
      // Si hay un error, realizar rollback para deshacer la transacción
      await this.connection.rollback();
      console.error('Error adding question:', error.message);
    }
  }
}
