import './sass/App.css';
import Header from './components/Header/header';
import Stockbar from './components/StockBar/stockbar';
import Main from './components/Main/main';
import Footer from './components/Footer/footer';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
        <div className="App">
          <Header />
          <Stockbar />
          <Main />            
          <Footer />
        </div>
    </Router>
  );
}

export default App;