const express = require('express');
const app = express();
const port = 8003;

// Importamos la función desde questionTemplates.js
const getQuestionTemplate = require('./questionTemplates');

app.use(express.json());

app.post('/getquestion', async (req, res) => {
    try {
        const questionAndAnswer = await getQuestionTemplate(); // Obtenemos el json de pregunta y sus respuestas

        if (questionAndAnswer) {
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
