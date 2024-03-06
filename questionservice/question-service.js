const express = require('express');
const app = express();
const port = 8003;

// Importamos la función desde questionTemplates.js
const getQuestionTemplate = require('./questionTemplates');
//agregar el servicio de guardarlas en bd 
const DatabaseManager = require('./DataBaseManager');
const questionService = new DatabaseManager();

app.use(express.json());

app.post('/getquestion', async (req, res) => {
    try {
        const questionAndAnswer = await getQuestionTemplate(); // Obtenemos el json de pregunta y sus respuestas

        //la insertamos en bd 
        if (questionAndAnswer) {
           // const correctAnswer = questionAndAnswer.answers.find(answer => answer.correct).answer;
            //const distractors = questionAndAnswer.answers.filter(answer => answer.answer !== correctAnswer).map(answer => answer.answer);
            try {
                await questionService.addQuestion(questionAndAnswer);
            } catch (error) {
                console.log("Error adding question to BD: " + error);
            }
            res.json(questionAndAnswer); //Devolvemos a la gateway el json
        } else {
            // Si no se obtuvo una pregunta por alguna razón, enviamos un error genérico
            res.status(500).json({ error: "Could not get a question and answers" });
        }
    } catch (error) {
        // En caso de cualquier error en el proceso, lo capturamos y enviamos un mensaje de error
        console.error("Error generating question:", error);
        res.status(500).json({ error: "Internal server error when generating the question" });
    }
});




app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
