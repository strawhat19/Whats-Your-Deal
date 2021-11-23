import './sass/App.css';
import Header from './components/Header/header';
import Stockbar from './components/StockBar/stockbar';
import Main from './components/Main/main';
import Footer from './components/Footer/footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Stockbar />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
