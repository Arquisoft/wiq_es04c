require('dotenv').config();//usado apra que al crear el .env te lo saque del entorno de docker las variables 

const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'wiq04ADM',
  database: process.env.DB_NAME || 'questions_db',
};

//clae encargada de agregar datos a la bd 
class DatabaseManager {
  config = dbConfig
    constructor() {
      this.connection = null;
    }


async connect() {
    try {
      console.log(this.config)
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

  async addQuestion(question, correctAnswer, distractors, questionType,questionCategory) {
    try {
      
      // Comenzamos la transacción para que si da errores se vuelva atrás
      await this.connect();
      await this.connection.beginTransaction();
      //PRIMERO COMPRUEBAS SI ESTAS CREANDO UNA CATEGORIA O SI YA EXISTE
      const categoryId = await this.ensureCategoryExists(questionCategory);
      // Insertar la pregunta
      const [questionResult] = await this.connection.execute(
        'INSERT INTO Pregunta (pregunta, respuesta_correcta, id_categoria) VALUES (?, ?, ?)',
        [question, correctAnswer, categoryId]
      );
  
      const questionId = questionResult.insertId;
  
      // Insertar los distractores
      //agregada la clausula ignore para que en caso de que existan no se aborte la transaccion 

      for (const distractor of distractors) {
        await this.connection.execute(
          'INSERT IGNORE INTO Distractor (distractor) VALUES (?)',
          [distractor]
        );
  
        // Obtener el ID del distractor recién insertado
        const [distractorResult] = await this.connection.execute(
          'SELECT id_distractor FROM Distractor WHERE distractor = ?',
          [distractor]
        );
        const distractorId = distractorResult[0].id_distractor;
  
        // Relacionar el distractor con la pregunta en la tabla de asociación
        await this.connection.execute(
          'INSERT INTO DistractorPregunta (id_pregunta, id_distractor, tipo) VALUES (?, ?, ?)',
          [questionId, distractorId, questionType]
        );
      }
  
      // Hacer commit para confirmar la transacción
      await this.connection.commit();
  
      console.log('Question added successfully. ID:', questionId);
    } catch (error) {
      // Si hay un error, realizar rollback para deshacer la transacción
      await this.connection.rollback();
      await this.disconnect();
      console.error('Error adding question:', error.message);
    }
  }
  //COMPRUEBA SI EXISTE LA CATEGORIA 
  async ensureCategoryExists(categoryName) {
    // Verificar si la categoría existe, y si no, insertarla
    const [categoryResult] = await this.connection.execute(
      'INSERT IGNORE INTO Categoria (nombre_categoria) VALUES (?)',
      [categoryName]
    );
  
    // Obtener o establecer el ID de la categoría
    return categoryResult.insertId || (
      await this.connection.execute(
        'SELECT id_categoria FROM Categoria WHERE nombre_categoria = ?',
        [categoryName]
      )
    )[0].id_categoria;
  }
  
}
module.exports = DatabaseManager;

