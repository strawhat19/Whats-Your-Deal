import './sass/App.css';
import Header from './components/Header/header';
import Stockbar from './components/StockBar/stockbar';
import Stockbar2 from './components/StockBar2/stockbar2';
import Main from './components/Main/main';
import Footer from './components/Footer/footer';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
        <div className="App">
          <Header />
          <Stockbar2 />
          <Main />            
          <Footer />
        </div>
    </Router>
  );
}

export default App;
