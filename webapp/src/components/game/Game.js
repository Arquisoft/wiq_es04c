// Importa React, useState para manejar el estado, axios para hacer solicitudes HTTP, y componentes de Material UI para la interfaz.
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button, Box, Paper, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

// Define el endpoint de la API, utilizando una variable de entorno o un valor predeterminado.
const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

const Game = () => {

    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState([]);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [category, setCategory] = useState('');//depuracion 
    const [type, setType] = useState('');//depuracion

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const handleAnswerButtonClick = (correct) => {
        if (correct) {
            setSnackbarMessage('Respuesta correcta');
            setSnackbarSeverity('success');
            setQuestion('');
            setAnswers([]);
            setLoadingMessage('Generando próxima pregunta');
            fetchQuestionAndAnswers();
        } else {
            setSnackbarMessage('Respuesta incorrecta');
            setSnackbarSeverity('error');
        }
        setSnackbarOpen(true);
    };

    // Función para llamar al questionservice y obtener la pregunta y las respuestas
    const fetchQuestionAndAnswers = async () => {
        try {
            const response = await axios.get(`${apiEndpoint}/getquestion`);
            // Almacena la pregunta y las respuestas en los estado.
            setQuestion(response.data.question);
            setAnswers(response.data.answers);
            setLoadingMessage('');
            setCategory(response.data.questionCategory); // Nueva línea
            setType(response.data.questionType); // Nueva línea

            // setQuestion(exampleData.question);
            // setAnswers(exampleData.answers);
        } catch (error) {
            // Manejo básico de errores: imprime el error en la consola.
            console.error('Error fetching question and answers', error);
        }
    };

    // Renderiza el componente.
    return (
        <Container component="main" maxWidth="sm" sx={{ mt: 4 }}>
            <Typography component="h1" variant="h5" gutterBottom>
                Generate Question and Answers
            </Typography>
            <Box sx={{ mb: 2 }}>
                <Button variant="contained" color="primary" onClick={fetchQuestionAndAnswers}>
                    Generate Question
                </Button>
            </Box>
            {loadingMessage && (<Typography variant="h2">{loadingMessage}</Typography>)}
            {/* Muestra la pregunta y las respuesta si existen */}
            {question && (
                <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                    <Typography variant="subtitle1">Question:</Typography>
                    <Typography variant="body1">{question}</Typography>
                </Paper>
            )}
            {answers && answers.map((answer, index) => (
                <div key={index} style={{ marginTop: '10px' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleAnswerButtonClick(answer.correct)}
                    >
                        {answer.answer}
                    </Button>
                </div>
            ))}

                   {/* ... */}
        {category && (
            <Typography variant="subtitle1">Category: {category}</Typography>
        )}
        {type && (
            <Typography variant="subtitle1">Type: {type}</Typography>
        )}
        {/* ... */}

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    severity={snackbarSeverity}
                    onClose={handleSnackbarClose}
                >
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </Container>
    );
};

// Exporta el componente para su uso en otras partes de la aplicación.
export default Game;