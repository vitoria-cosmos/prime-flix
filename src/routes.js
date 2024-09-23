// importar a biblioteca que nos possibilita a navegação por páginas
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Filme from './pages/Filme';
import Header from './components/Header';
import Erro from './pages/Erro';

function RoutesApp() {
    return (
        <BrowserRouter>
        <Header/>
        {/* colocar o nosso componente header encima das rotas para ele poder ser renderizado em todas as páginas */}
        <Routes>
            <Route path='/' element={ <Home/>}/>
            <Route path='/filme/:id' element={ <Filme/> }/>

            {/* a rota de erro  sempre tem que ficar por último */}
            <Route path='*' element={ <Erro/> }/>
        </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;
