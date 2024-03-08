const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const { render, fireEvent, waitFor } = require('@testing-library/react');
const express = require('express');
const questionService = require('./questionService');

const mockApp = express();
const mockPort = 8003;

const mockAxios = new MockAdapter(axios);

describe('questionService', () => {
    beforeAll(() => {
        mockAxios.onPost('/getquestion').reply(200, {
            question: '¿Cuál es la capital de Francia?',
            answers: [
                { answer: 'París', correct: true },
                { answer: 'Londres', correct: false },
                { answer: 'Berlín', correct: false },
                { answer: 'Oviedo', correct: false}
            ]
        });
    });

    it('fetches question and answers correctly', async () => {
        const { getByText } = render(<TestComponent />);
        fireEvent.click(getByText('Fetch Question'));
        await waitFor(() => expect(getByText('¿Cuál es la capital de Francia?')).toBeInTheDocument());
        expect(getByText('París')).toBeInTheDocument();
        expect(getByText('Londres')).toBeInTheDocument();
        expect(getByText('Berlín')).toBeInTheDocument();
        expect(getByText('Oviedo')).toBeInTheDocument();
    });
});

const TestComponent = () => {
    const handleFetchQuestion = async () => {
        try {
            const response = await axios.post(`http://localhost:${mockPort}/getquestion`);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching question:', error);
        }
    };

    return (
        <div>
            <button onClick={handleFetchQuestion}>Fetch Question</button>
        </div>
    );
};

// Start mock server
mockApp.listen(mockPort, () => {
    console.log(`Mock server listening on http://localhost:${mockPort}`);
});
