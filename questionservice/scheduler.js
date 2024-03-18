//clase encargada de generar preguntas cada hora , se tiene que isntaciar para poder usarsel y llamar a start 
//llamado desde el question-service.js
const cron = require('node-cron');
const DataBaseManager = require('./DataBaseManager'); // Asegúrate de que la ruta sea correcta
const templates = require('./templates.json')
const WikiQuery = require('./wikiUtils/wikiQuery');

class Scheduler {

  success;

  constructor() {
    this.dbManager = new DataBaseManager();
  }

  async addQuestion() {
    try {
      const questions = await WikiQuery.getQuestions(templates.capital_of, 1);
      await this.dbManager.addQuestion(questions[0]);
      this.success = true;
    } catch (error) {
      console.error(error);
    }
  }
  
  start() {
    cron.schedule('*/15 * * * *', async () => {
      
      try {
        await this.addQuestion();
      } catch (error) {
          console.error('Failed to add question:', error);
          // Aquí podrías implementar una lógica para manejar el error, como reintentar después de un tiempo,
          // enviar una alerta, etc.
          console.log("Will try again later");
      }
      
      
      /* version con errores 
      this.success = false;
      while (!this.success) {
        //ojo como es asincrono si no lo pones el bucle se sigue ejecutando y petas la pila de javasycrpit y cae el contendor 
        await this.addQuestion();
      }
      */
    });
  }
}

module.exports = Scheduler;