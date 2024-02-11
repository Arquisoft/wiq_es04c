const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 8003;

app.use(express.json());

async function getCountryAndCapital() {
    const sparqlQuery = `
    SELECT ?country ?countryLabel ?capitalLabel WHERE {
        ?country wdt:P31 wd:Q6256; # Tipo de entidad: País
                 wdt:P36 ?capital. # Propiedad: Tiene por capital
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
      }
      ORDER BY RAND()
      LIMIT 100`; // Solicitamos 100 resultados y luego seleccionaremos uno al azar
    const url = `https://query.wikidata.org/sparql?query=${encodeURIComponent(sparqlQuery)}`;
    const headers = { "Accept": "application/json" };

    try {
        const response = await fetch(url, { headers });
        if (response.ok) {
            //Obtenemos resultados de la consulta a la api
            const data = await response.json();
            // Seleccionar un resultado aleatorio de los obtenidos
            const randomIndex = Math.floor(Math.random() * data.results.bindings.length);
            //Escogemos un resultado al azar
            const bindings = data.results.bindings[randomIndex];
            //Retornamos el json correspondiente
            return {
                question: `¿Cuál es la capital de ${bindings.countryLabel.value}?`,
                answer: bindings.capitalLabel.value
            };
        } else {
            console.error('Error al realizar la consulta SPARQL', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error al realizar la consulta SPARQL', error);
        return null;
    }
}

app.post('/generatequestion', async (req, res) => {
    const questionAndAnswer = await getCountryAndCapital();

    if (questionAndAnswer) {
        res.json(questionAndAnswer);
    } else {
        res.status(500).json({ error: "No se pudo obtener una pregunta y respuesta de Wikidata" });
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
