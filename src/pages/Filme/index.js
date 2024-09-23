import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 

// acessando nosso arquivo para fazer requisições para a api
import api from '../../services/api';

function Filme() {

    const { id } = useParams();
    // aqui pegamos o id do filme que passamos como parametro na rota /filmes

    const [filme, setFilme] = useState({});
    // essa state é para armazenar o data da requisição

    const [loading, setLoading] = useState(true);

    // aqui vamos fazer uma requisição para que possamos acessar os dados de cada filme conforme o seu id
    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: '03842d04dd6bb1daedf598dbf7779539',
                    language: 'pt-BR',
                }
            })
            // se ele encontrar o filme, ele vai cair dentro do then
            // o response é toda a resposta do servidor
            // O AXIOS SEMPRE DEVOLVE O CONTEÚDO DENTRO DE UMA PROPRIEDADE DATA
            .then((response) => {
                console.log('response.data: ', response.data);
                setFilme(response.data);
                setLoading(false);
            })
            // se der errado, ele cai em um catch. No caso, a pessoa pode ter colocado um id na url que não existe.
            .catch(() => {
                console.log('FILME NÃO ENCONTRADO');
            })

        }

        loadFilme();
        // quando abrir a página, vamos executar o loadFilmes

        return () => {
            console.log('COMPONENTE FOI DESMONTADO');
        }
    }, []);

    if(loading) {
        return (
            <div className='filme-info'>
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }
    return (
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
        </div>
    )
}

export default Filme;