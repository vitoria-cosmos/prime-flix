import RoutesApp from './routes';
 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      {/* container do nosso toast */}
      <ToastContainer autoClose={3000}/>
      {/* ele vai fezhar em 3s, se ninguém clicar ou passar o mouse encima */}
      <RoutesApp/>
      
    </div>
  );
}

export default App;
