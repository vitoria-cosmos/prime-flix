import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 

// acessando nosso arquivo para fazer requisições para a api
import api from '../../services/api';

import './filme-info.css';



function Filme() {

    const { id } = useParams();
    // aqui pegamos o id do filme que passamos como parametro na rota /filmes

    const [filme, setFilme] = useState({});
    // essa state é para armazenar o data da requisição

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    // navigate também é um hook, faz com que possamos redirecionar o usuário para outra página

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
                navigate('/', { replace: true});
                // eu vou redirecionar o usuário para a página home

                return;
                // vai parar a execução do código
            })

        }

        loadFilme();
        // quando abrir a página, vamos executar o loadFilmes

        return () => {
            console.log('COMPONENTE FOI DESMONTADO');
        }
    }, [navigate, id]);
    // quando estammos utilizando o useEffect com hooks dentro, temos que declará-los dentro dos colchetes
    // temos que passá-los como dependencias do useEffect

    function salvarFilme() {
        // alert('TESTE');
        const minhaLista = localStorage.getItem('@primeflix');
        // vai pegar a lista de filmes salvos

        let filmesSalvos = JSON.parse(minhaLista) || [];
        // aqui estamos transformando a string em lista. Se não houver lista, vamos começar com uma lista vazia

        // Lógica para não salvar filmes duplicados
        // o some verifica se tem pelo menos um item que voce quer procurar
        // aqui vamos ver se já tem um filme salvo com o mesmo id
        const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id )
        // Essa variável retorna true ou false

        if (hasFilme) {
            alert('ESSE FILME JÁ ESTÁ NA LISTA');
            return;
        }

        // SALVAR O NOSSO OBJETO NA LISTA
        filmesSalvos.push(filme);
        localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos));
        // aqui estamos trnsformando a lista em string, pois não conseguimos salvar uma array no localStorage

        alert('FILME SALVO COM SUCESSO!');
    }

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

            <strong>Avaliação {filme.vote_average} / 10</strong>

            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    {/* aqui estamos fazendo uma busca no youtube de acordo com o titulo do filme */}
                    <a target='blank' rel='external' href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                    {/* o atributo target é para que a url seja aberta em outra aba */}
                    {/* o atributo rel significa que é um link externo e não temos controle sobre ele */}
                    {/* colocar só o blanck é mais seguro */}
                </button>

            </div>
        </div>
    )
}

export default Filme;