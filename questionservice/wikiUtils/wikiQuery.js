const wikiCall = require("./wikiCall");

//Selecionar un resultado de las consultas aleatorio
const randomElement = (items) => items[Math.floor(Math.random() * items.length)];

class wikiQuery {
    
    static async getRandomCountryAndCity() {
        const query = `
        SELECT ?country ?countryLabel ?capitalLabel WHERE {
            ?country wdt:P31 wd:Q6256; # Tipo de entidad: País
                     wdt:P36 ?capital. # Propiedad: Tiene por capital
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
          }
          LIMIT 50`;
    
        const results = randomElement(await wikiCall(query));
        
        return {
            name: results['countryLabel'].value,
            capital: results['capitalLabel'].value
        };
    }

    static async getRandomCity() {
        const query = `
        SELECT ?city ?cityLabel WHERE {
            ?city wdt:P31 wd:Q515; # Tipo de entidad: Ciudad
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
        }
        LIMIT 50`;
    
        
        const results = randomElement(await wikiCall(query));
        
        return results['cityLabel'].value;

    }    
    static async getFakeCity(capital) {
        let Fakecitys = [];
    
        while(Fakecitys.length < 3) {
            let randomCity = await this.getRandomCity();
            if(randomCity !== capital && !Fakecitys.includes(randomCity)) {
                Fakecitys.push(randomCity);
            }
        }
    
        return Fakecitys;
    }
    

}

module.exports = wikiQuery