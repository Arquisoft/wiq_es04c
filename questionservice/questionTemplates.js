const wikiQuery = require("./wikiUtils/wikiQuery")

const templates = [
    async () => {
        const country = await wikiQuery.getRandomCountryAndCity();
        //Obtenemos los fakeCities
        const fakeCities = await wikiQuery.getFakeCity(country.capital); 
        const correctAnswer = { answer: country.capital, correct: true };
        const fakeAnswers = fakeCities.map(city => ({ answer: city, correct: false }));
        const answers = [correctAnswer, ...fakeAnswers];
        const type = "capital";//representa porque estas preguntando
        const cateogria="Geografía";
        // Mezclamos las respuestas para que la posición de la correcta sea aleatoria
        const shuffledAnswers = shuffleArray(answers);

        return {
            question: `¿Cuál es la capital de ${country.name}?`,
            answers: shuffledAnswers,
            questionCategory: cateogria,
            questionType:type
        };
    },
    // Aquí podemos añadir más templates
];

// Función para mezclar las respuestas
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array;
}

// Seleccionamos aleatoriamente un template y lo ejecutamos
module.exports = () => templates[Math.floor(Math.random()*templates.length)]();
