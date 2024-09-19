
// Base da URL: 
// https://api.themoviedb.org/3/

// url da api
// https://api.themoviedb.org/3/movie/now_playing?api_key=03842d04dd6bb1daedf598dbf7779539&language=pt-br 
// depois do 3 são as rotas, sempre essa parte vai mudar.

// não vamos mais usar o fetch para consumir a api, vamos usar a biblioteca axios que vai nos permitir fazer as requisições http

import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
    // essa é a base da url que nunca vai mudar para nenhuma chamada
    // as nossas rotas que de fato mudam
});

export default api;
// temos que exportar nossa variável api para podermos usá-la em outros arquivos
// vamos fazer as chamadas da api com essa variável