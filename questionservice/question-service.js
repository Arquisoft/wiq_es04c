const express = require('express');
const app = express();
const port = 8003;

// Importamos la función desde questionTemplates.js
const getQuestionTemplate = require('./questionTemplates');
//agregar el servicio de guardarlas en bd 
const DatabaseManager = require('./DataBaseManager');
const questionService = new DatabaseManager();
const Scheduler = require('./scheduler');
const scheduler = new Scheduler(); // Crea una nueva instancia de la clase

scheduler.start();//iniciar el servicio de crear las preguntas 
app.use(express.json());

app.get('/getquestion', async (req, res) => {
    try{
    
        const questionAndAnswer = await questionService.getGameQuestions(); // Obtenemos el json de pregunta y sus respuestas
        //const questionAndAnswer = await getQuestionTemplate(); // Obtenemos el json de pregunta y sus respuestas
        console.log(questionAndAnswer); // Imprime questionAndAnswer en la consola

        res.json(questionAndAnswer); //Devolvemos a la gateway el json
    }catch(error){
        console.log("Error getting question from BD: " + error);
        await scheduler.addQuestion();
        const questionAndAnswer = await questionService.getGameQuestions();
        res.json(questionAndAnswer); //Devolvemos a la gateway el json
    }
        
});




app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
