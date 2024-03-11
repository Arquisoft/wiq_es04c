// Importa React, useState para manejar el estado, axios para hacer solicitudes HTTP, y componentes de Material UI para la interfaz.
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button, Snackbar,Grid,Box } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

// Define el endpoint de la API, utilizando una variable de entorno o un valor predeterminado.
const apiEndpoint = process.env.REACT_APP_API_URI || 'http://localhost:8000';

const Game = () => {

    
  const buttonColors = ['#ff0000', '#00008b', '#0000ff', '#00ff00'];

    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState([]);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');


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
          

        } catch (error) {
            // Manejo básico de errores: imprime el error en la consola.
            console.error('Error fetching question and answers', error);
        }
    };

    // Renderiza el componente.
    return (
        <Container component="main" sx={{ mt: 4 ,flexGrow: 1}}>
             {question && (
                <Typography variant="h1" sx={{fontSize: '5em'}}>{question}</Typography>
            )}
            <Box sx={{ mb: 2 }}>
                <Button variant="contained" color="primary" onClick={fetchQuestionAndAnswers}>
                    Generate Question
                </Button>
            </Box>
            {loadingMessage && (<Typography variant="h2">{loadingMessage}</Typography>)}
            {/* Muestra la pregunta y las respuesta si existen */}


            <Grid container spacing={3}>
                {answers?.map((answer, index) => (
                <Grid item xs={6} key={index}>
                    <Button
                    variant="contained"
                    fullWidth
                    style={{ 
                        backgroundColor: buttonColors[index % 4], color: '#ffffff', 
                        padding:'0.8em',
                        fontSize:'1.5em',    
                    }}
                    onClick={() => handleAnswerButtonClick(answer.correct)}
                    >
                    {answer.answer}
                    </Button>
                </Grid>
                ))}
            </Grid>

 
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