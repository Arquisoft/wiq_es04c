

const express = require('express');
const app = express();
const port = 8003;

// Importamos la función desde questionTemplates.js
const templates = require('./templates.json')
//agregar el servicio de guardarlas en bd 
const DatabaseManager = require('./DataBaseManager');
const databaseManager = new DatabaseManager();
const Scheduler = require('./scheduler');
const scheduler = new Scheduler(); // Crea una nueva instancia de la clase
const WikiQuery = require('./wikiUtils/wikiQuery');

scheduler.start();//iniciar el servicio de crear las preguntas 
app.use(express.json());

app.get('/getquestion', async (req, res) => {
    try {

        const questionAndAnswer = await databaseManager.getGameQuestions(); // Obtenemos el json de pregunta y sus respuestas
        //const questionAndAnswer = await getQuestionTemplate(); // Obtenemos el json de pregunta y sus respuestas
        console.log(questionAndAnswer); // Imprime questionAndAnswer en la consola

        res.json(questionAndAnswer); //Devolvemos a la gateway el json
    } catch (error) {
        console.log("Error getting question from BD: " + error);
        await scheduler.addQuestion();
        const questionAndAnswer = await databaseManager.getGameQuestions();
        res.json(questionAndAnswer); //Devolvemos a la gateway el json
    }

});

app.get('/generatequestions', async (req, res) => {
    try {
        const template = templates.capital_of;
        const questions = await WikiQuery.getQuestions(template, 10);
        questions.forEach(q => {
            console.log(q.question);
            console.log(q.answers)
        });
        await databaseManager.addQuestions(questions);
        res.json({ status: 'OK' });
    } catch (error) {
        res.status(error.response.status).json({ error: error.response.data.error });
    }

});


app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
