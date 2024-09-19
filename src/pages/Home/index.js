// queremos consumir a nossa api no home
import { useEffect, useState } from 'react';
// utilizamos o useEffect para que quando o usuário abra a aplicação, os filmes sejam carregados
// o useEffect vai na api e busca os filmes

// o useState é para quando os filmes forem carregados sejam armazenados em um estado para podermos utilizá-los na aplicação


// URL DA API: https://api.themoviedb.org/3/movie/now_playing?api_key=03842d04dd6bb1daedf598dbf7779539&language=pt-br

import api from '../../services/api';

import { Link } from 'react-router-dom';
import './home.css';
function Home() {

    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        // vamos buscar a nossa api
        async function loadFilmes() {
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: "03842d04dd6bb1daedf598dbf7779539",
                    language: "pt-BR",
                    page: 1,
                    // aqui a gente quer pegar só os filmes da primeira página
                }
            })
            // await é para esperar a resposta, pois pode demorar
            // dentro do api.get, a gente vai passar a rota que queremos acessar
            // depois, a gente vai passar alguns parametros

            // console.log('Resposta da api: ', response);
            // aqui a gente está consolando a resposta da nossa requisição a api

            // dentro da propriedade data que temos o resultado da nossa requisição
            // console.log(response.data);

            // é o results que eu quero
            // console.log(response.data.results);

            // eu quero pegar só os primeiros 10 filmes
            console.log(response.data.results.slice(0, 10));

            // guardar a array de filmes na nossa useState
            setFilmes(response.data.results.slice(0, 10));
        }

        loadFilmes();

    }, []);
    // toda vez que a nossa aplicação abrir, ele vai chamar o useEffect

    return (
        <div className='container'>
            <div className='lista-filmes'>
                {filmes.map((filme) => {
                    return (
                        <article key={filme.id}>
                            {/* a key é para que o react reconheça que cada elemento é diferente entre si */}
                            <strong>{filme.title}</strong>
                            {/* vamos renderizar os titulos em portugues */}
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}/>
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                    )
                })}

            </div>
        </div>
    )
}

export default Home;

// O nome do componente sempre é maiúscula e também o seu nome nas pastas