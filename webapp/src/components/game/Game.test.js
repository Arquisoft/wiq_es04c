import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios'; // Mockear axios
import Game from './Game';

jest.mock('axios');

describe('Game Component', () => {
    beforeEach(() => {
        axios.get.mockResolvedValue({
            data: {
                question: '¿Cuál es la capital de Asturias?',
                answers: [
                    { answer: 'Santander', correct: false },
                    { answer: 'Oviedo', correct: true },
                    { answer: 'Zamora', correct: false },
                    { answer: 'Galicia', correct: false}
                ],
                questionCategory: 'Geography',
                questionType: 'Multiple Choice'
            }
        });
    });

    it('renders without crashing', () => {
        render(<Game />);
    });

    it('fetches question and answers when "Generate Question" button is clicked', async () => {
        const { getByText } = render(<Game />);
        const generateButton = getByText('Generate Question');
        fireEvent.click(generateButton);
        await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    });

    it('displays question and answers after fetching', async () => {
        const { getByText, getByRole } = render(<Game />);
        const generateButton = getByText('Generate Question');
        fireEvent.click(generateButton);
        await waitFor(() => expect(getByText('¿Cuál es la capital de Asturias?')).toBeInTheDocument());
        expect(getByText('Santander')).toBeInTheDocument();
        expect(getByText('Oviedo')).toBeInTheDocument();
        expect(getByText('Zamora')).toBeInTheDocument();
        expect(getByText('Galicia')).toBeInTheDocument();
    });

    
    it('displays category and type after fetching', async () => {
        const { getByText } = render(<Game />);
        const generateButton = getByText('Generate Question');
        fireEvent.click(generateButton);
        await waitFor(() => expect(getByText('Category: Geography')).toBeInTheDocument());
        expect(getByText('Type: Multiple Choice')).toBeInTheDocument();
    });

    it('displays success snackbar when correct answer is selected', async () => {
        const { getByText } = render(<Game />);
        const generateButton = getByText('Generate Question');
        fireEvent.click(generateButton);
        await waitFor(() => expect(getByText('¿Cuál es la capital de Asturias?')).toBeInTheDocument());
        const correctAnswerButton = getByText('Oviedo');
        fireEvent.click(correctAnswerButton);
        await waitFor(() => expect(getByText('Respuesta correcta')).toBeInTheDocument());
    });

    it('displays error snackbar when incorrect answer is selected', async () => {
        const { getByText } = render(<Game />);
        const generateButton = getByText('Generate Question');
        fireEvent.click(generateButton);
        await waitFor(() => expect(getByText('¿Cuál es la capital de Asturias?')).toBeInTheDocument());
        const incorrectAnswerButton = getByText('Santander');
        fireEvent.click(incorrectAnswerButton);
        await waitFor(() => expect(getByText('Respuesta incorrecta')).toBeInTheDocument());
    });
    
});