import './header.css';
import { Link } from 'react-router-dom';
// aqui a gente vai poder utilizar a navegação de páginas por links

function Header() {
    return (
        <header>
            <Link className='logo' to='/'>Prime Flix</Link>
            <Link className='favoritos' to='/favoritos'>Meus filmes</Link>
        </header>

    )
}

export default Header;
