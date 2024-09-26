import { useEffect, useState } from 'react';
import './favoritos.css';
import { Link } from 'react-router-dom';

function Favoritos() {

    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        const minhaLista = localStorage.getItem('@primeflix');
        setFilmes(JSON.parse(minhaLista) || []);
        // aqui vamos passar a o que vem do localStorage para lista ou se não tiver nada, vai criar uma array vazia
    }, [])

    function excluirFilme() {
        alert('teste');
    }

    return (
        <div className='meus-filmes'>
            <h1>Meus favoritos</h1>

            <ul>
                {filmes.map((item) => {
                    return (
                        <li key={item.id}>
                            <span>{item.title}</span>

                            <div>
                                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                                <button onClick={excluirFilme}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;