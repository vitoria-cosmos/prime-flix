import { useEffect, useState } from 'react';
import './favoritos.css';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';

function Favoritos() {

    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        const minhaLista = localStorage.getItem('@primeflix');
        setFilmes(JSON.parse(minhaLista) || []);
        // aqui vamos passar a o que vem do localStorage para lista ou se não tiver nada, vai criar uma array vazia
    }, [])


    function excluirFilme(id) {
        // alert('teste');
        // alert('ID CLICADO: ' + id);
        let filtroFilmes = filmes.filter( (item) => {
            return (item.id !== id)
            // aqui a gente vai pegar o resto dos filmes que não queremos excluir
        })

        setFilmes(filtroFilmes);
        // aqui vamos setar os filmes que não queremos excluir, menos com o que queremos excluir

        // salvar os filmes não excluidos no localStorage
        localStorage.setItem('@primeflix', JSON.stringify(filtroFilmes));

        toast.success('Filme removido com sucesso!');
    }

    return (
        <div className='meus-filmes'>
            <h1>Meus favoritos</h1>

            {filmes.length === 0 && <span>Você não possui nenhum filme salvo :( </span>}
            {/* aqui é para aparecer somente quando não possuimos nenhym filme salvo na lista */}

            <ul>
                {filmes.map((item) => {
                    return (
                        <li key={item.id}>
                            <span>{item.title}</span>

                            <div>
                                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                                <button onClick={() => excluirFilme(item.id)}>Excluir</button>
                                {/* aqui vamos passar como parametro o id de cada filme, para que possamos excluir o item correto */}
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;