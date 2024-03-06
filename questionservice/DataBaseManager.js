const mysql = require('mysql2/promise');
const express = require('express');
const bodyParser = require('body-parser'); 
const app = express();
const port = 3306;

// Middleware to parse JSON in request body
app.use(bodyParser.json());

// Rest of your code...

const dbConfig = {
  host:  process.env.DB_HOST || 'questionservice-mysql-wiq_es04c',
  user:  process.env.DB_USER || 'root',
  password:  process.env.DB_PASSWORD || 'admin',
  database: process.env.DB_NAME || 'questions_db',
  port: process.env.DB_PORT || 3306,
  charset : 'utf8mb4'
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
  async ensureCategoryExists(categoryName) {
    // Comprobar si la categoría ya existe
    const [rows] = await this.connection.execute(
      'SELECT id_categoria FROM Categoria WHERE nombre_categoria = ?',
      [categoryName]
    );

    if (rows.length > 0) {
      // Si la categoría ya existe, devolver su ID
      return rows[0].id_categoria;
    } else {
      // Si la categoría no existe, crearla y devolver su ID
      const [result] = await this.connection.execute(
        'INSERT INTO Categoria (nombre_categoria) VALUES (?)',
        [categoryName]
      );

      return result.insertId;
    }
  }

  async addQuestion(question) {
    try {
      await this.connect();

      const { question: questionText, answers, questionCategory, questionType } = question;

      // Comenzamos la transacción para que si da errores se vuelva atrás
      await this.connection.beginTransaction();

      //PRIMERO COMPRUEBAS SI ESTAS CREANDO UNA CATEGORIA O SI YA EXISTE
      const categoryId = await this.ensureCategoryExists(questionCategory);

      // Insertar la pregunta
      const correctAnswer = answers.find(answer => answer.correct).answer;
      const [questionResult] = await this.connection.execute(
        'INSERT INTO Pregunta (pregunta, respuesta_correcta, id_categoria) VALUES (?, ?, ?)',
        [questionText, correctAnswer, categoryId]
      );

      // Insertar los distractores
      for (const answer of answers) {
        if (!answer.correct) {
          const [distractorResult] = await this.connection.execute(
            'INSERT  INTO Distractor (distractor,id_categoria) VALUES (?,?)',
            [answer.answer, categoryId]
          );

         
        }
      }

      // Si todo ha ido bien, confirmar la transacción
      await this.connection.commit();

    } catch (error) {
      // Si algo ha ido mal, revertir la transacción
      await this.connection.rollback();

      console.error('Error adding question:', error.message);
      throw error;
    } finally {
      // Desconectar de la base de datos
      await this.disconnect();
    }
  }
}
  

module.exports = DatabaseManager;

