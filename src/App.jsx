import { BrowserRouter} from 'react-router-dom';
import './App.css';
import MainNavBar from './pages/MainNavBar';

function App() {
  return (
     <BrowserRouter>
         <MainNavBar/>
     </BrowserRouter>
  );
}

export default App;
