import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { act } from 'react-dom/test-utils';
import { apiEndpoint } from '../../../apiEndpoint';
import Game from './Game';

const mockAxios = new MockAdapter(axios);
const mockResponse = {
    question: '¿Cuál es la capital de Asturias?',
    answers: [
        { answer: 'Santander', correct: false },
        { answer: 'Oviedo', correct: true },
        { answer: 'Zamora', correct: false },
        { answer: 'Galicia', correct: false }
    ]
};
describe('Game Component', () => {
    beforeEach(() => {
        mockAxios.reset();
    });

    it('should render without crashing', () => {
        render(<Game />);
    });

    it('fetches question and answers on component mount', async () => {
        mockAxios.onGet(apiEndpoint+'/getquestion').reply(200, mockResponse);

        await act(async () => {
            render(<Game />);
        });
        expect(screen.getByText(mockResponse.question)).toBeInTheDocument();
        for (const element of mockResponse.answers) {
            expect(screen.getByText(element.answer)).toBeInTheDocument();
        }
    });
    
    it('displays correct snackbar when an answer is selected', async () => {
        mockAxios.onGet(apiEndpoint+'/getquestion').reply(200, mockResponse);
        await act(async () => {
            render(<Game />);
        });

        const correctAnswerButton = screen.getByText('Oviedo')
        act(() => {
            fireEvent.click(correctAnswerButton);
        });
        expect(screen.getByText('Respuesta correcta')).toBeInTheDocument();
    });

    it('displays error snackbar when incorrect answer is selected', async () => {
        mockAxios.onGet(apiEndpoint+'/getquestion').reply(200, mockResponse);
        await act(async () => {
            render(<Game />);
        });

        const incorrectAnswerButton = screen.getByText('Santander')
        act(() => {
            fireEvent.click(incorrectAnswerButton);
        });
        expect(screen.getByText('Respuesta incorrecta')).toBeInTheDocument();
    });
});
