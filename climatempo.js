const axios = require('axios');

const api = axios.create({
    baseURL: 'http://apiadvisor.climatempo.com.br/api/v1/',
    responseType: 'json'
});

async function getIdCidade(cidade, estado) {
    const token = process.env.climaTempoKey;
    try {
        const endpoint = `locale/city?name=${ cidade }&state=${ estado }&token=${ token }`;
        console.log(`GET http://apiadvisor.climatempo.com.br/api/v1/${ endpoint }`);
        const response = await api.get(endpoint);
        console.log(`Response ${ response.status } - Data: `, response.data);

        let data = response.data[0];

        if (!data) {
            return `Cidade / Estado não encontrados na API.`;
        }

        return data.id;
    } catch (e) {
        console.error(e.response.data);

        return `Erro ao buscar a cidade na API. StatusCode: ${ e.response.status }`;
    }
};

async function getPrevisaoTempo(cidade, estado) {
    const token = process.env.climaTempoKey;
    const idCidade = await getIdCidade(cidade, estado);

    try {
        let endpoint = `forecast/locale/${ idCidade }/days/15?token=${ token }`;

        console.log(`GET http://apiadvisor.climatempo.com.br/api/v1/${ endpoint }`);
        const response = await api.get(endpoint);
        console.log(`Response ${ response.status } - Data: `, response.data);

        let previsaoHoje = response.data.data[0];

        let mensagem = `Previsão para ${ previsaoHoje.date_br }:\n` +
            `${ previsaoHoje.text_icon.text.phrase.reduced }\n` +
            `Mínima de ${ previsaoHoje.temperature.min }°, máxima de ${ previsaoHoje.temperature.max }°.\n` +
            `Chance de chuva de ${ previsaoHoje.rain.probability }%, com precipitação de ${ previsaoHoje.rain.precipitation }mm.`
            ;

        return mensagem;
    } catch (e) {
        console.error(e.response.data);

        return `Erro ao buscar a previsão na API. StatusCode: ${ e.response.status }`;
    }
}

module.exports = {
    getIdCidade,
    getPrevisaoTempo
};
