const express = require('express');
const app = express();
const port = 8003;

app.use(express.json());

// Endpoint para generar una pregunta y respuesta
app.post('/generatequestion', (req, res) => {
    // Ejemplo de pregunta y respuesta
    const questionAndAnswer = {
        question: "¿Cuál es la capital de Francia?",
        answer: "París"
    };

    // Devuelve la pregunta y respuesta como JSON
    res.json(questionAndAnswer);
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Backend para generación de preguntas escuchando en http://localhost:${port}`);
});
