//clase encargada de generar preguntas cada hora , se tiene que isntaciar para poder usarsel y llamar a start 
//llamado desde el question-service.js
const cron = require('node-cron');
const DataBaseManager = require('./DataBaseManager'); // Asegúrate de que la ruta sea correcta
const getQuestionTemplate = require('./questionTemplates');

class Scheduler {
  constructor() {
    this.dbManager = new DataBaseManager();
  }


  start() {
    cron.schedule('*/30 * * * *', async () => {
      let success = false;
      while (!success) {
        try {
          const templates = await getQuestionTemplate(); // Obtenemos el json de pregunta y sus respuestas
          await this.dbManager.addQuestion(templates);
          success = true;
        } catch (error) {
          console.error(error);
        }
      }
    });
  }
}

module.exports = Scheduler;