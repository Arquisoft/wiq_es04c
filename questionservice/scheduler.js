//clase encargada de generar preguntas cada hora , se tiene que isntaciar para poder usarsel y llamar a start 
//llamado desde el question-service.js
const cron = require('node-cron');
const DataBaseManager = require('./DataBaseManager'); // Asegúrate de que la ruta sea correcta
const getQuestionTemplate = require('./questionTemplates');

class Scheduler {

  success;

  constructor() {
    this.dbManager = new DataBaseManager();
  }

  async addQuestion() {
    try {
      const templates = await getQuestionTemplate(); // Obtenemos el json de pregunta y sus respuestas
      await this.dbManager.addQuestion(templates);
      this.success = true;
    } catch (error) {
      console.error(error);
    }
  }

  start() {
    cron.schedule('*/30 * * * *', async () => {
      this.success = false;
      while (!this.success) {
        this.addQuestion();
      }
    });
  }
}

module.exports = Scheduler;