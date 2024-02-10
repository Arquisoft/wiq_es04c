// Importa React, useState para manejar el estado, axios para hacer solicitudes HTTP, y componentes de Material UI para la interfaz.
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button, Box, Paper, Grid } from '@mui/material';

// Define el endpoint de la API, utilizando una variable de entorno o un valor predeterminado.
const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

// Componente para generar y mostrar una pregunta y su respuesta.
const GenerateQuestion = () => {
  // Estado para almacenar la pregunta y la respuesta.
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  // Función para llamar al backend y generar una pregunta y respuesta.
  const fetchQuestionAndAnswer = async () => {
    try {
      // Realiza una solicitud POST al backend.
      const response = await axios.post(`${apiEndpoint}/generatequestion`);
      // Almacena la pregunta y la respuesta en el estado.
      setQuestion(response.data.question);
      setAnswer(response.data.answer);
    } catch (error) {
      // Manejo básico de errores: imprime el error en la consola.
      console.error('Error fetching question and answer', error);
    }
  };

  // Renderiza el componente.
  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 4 }}>
      <Typography component="h1" variant="h5" gutterBottom>
        Generate Question and Answer
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Button variant="contained" color="primary" onClick={fetchQuestionAndAnswer}>
          Generate Question
        </Button>
      </Box>
      {/* Muestra la pregunta y la respuesta si existen */}
      {question && (
        <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle1">Question:</Typography>
          <Typography variant="body1">{question}</Typography>
        </Paper>
      )}
      {answer && (
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="subtitle1">Answer:</Typography>
          <Typography variant="body1">{answer}</Typography>
        </Paper>
      )}
    </Container>
  );
};

// Exporta el componente para su uso en otras partes de la aplicación.
export default GenerateQuestion;
