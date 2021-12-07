import React from 'react';
import './sass/App.css';
import Header from './components/Header/header';
import Stockbar from './components/StockBar/stockbar';
import Main from './components/Main/main';
import Footer from './components/Footer/footer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import $ from 'jquery';
import Stock from './models/Stock';
import userContext from './contexts/loginContext';

const userData = JSON.parse(localStorage.getItem(`Current User`));

export default class App extends React.Component {

  state = {
    stocks: [],
    histories: [],
    user: userData
  }

  async componentDidMount(stockList) {
    const filterHistories = (companySymbol) => {
      let histories = this.state.histories || JSON.parse(localStorage.getItem(`User Histories`));
      if (histories.length == 15) {
        let last15 = histories.filter(history => {
          if (history.symbol === companySymbol) {
            return history.historical;
          }
        });
        return last15[0].historical;
      }
    }
      let histories = [];
      $(`#stockBar`).hide();
      const stockAPIURL = `https://financialmodelingprep.com/api/v3/available-traded/list?limit=100&apikey=7e60778244bbb11a3e59192e565ed625`;
      const response = await fetch(stockAPIURL);
      stockList = await response.json();
      stockList.splice(15);
      stockList.map((stock,index,history) => {
          let symbol = stock.symbol;
          fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`)
          .then(historyResponse => historyResponse.json()).then(history => {
              history.historical.splice(15);
              histories.push(history);
              localStorage.setItem(`User Histories`, JSON.stringify(histories));
              this.setState(previousState => ({
                histories: [...previousState.histories, history]
              }));
          });
          const profileURL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`;
          fetch(profileURL).then(newResponse => newResponse.json()).then((profileList,index) => {
            let plus = ``;
            let condition = ``;
            let stockBarLoading = `Stock Bar is Loading: `;
            let APIString = `API`;
            let placeHolderImage = `https://raw.githubusercontent.com/strawhat19/Whats-Your-Deal/main/public/assets/Stock-Icon-Circle-Icon.png`;
            let stockProf = profileList.profile || stockBarLoading;
            let name = stockProf.companyName || stockBarLoading;
            let emptyString = name || `Loading...`;
            let image = stockProf.image || placeHolderImage;
            let officialSymbol = profileList.symbol || APIString;
            let price = stockProf.price || emptyString;
            let website = stockProf.website || image;
            let description = stockProf.description || emptyString;
            let ceo = stockProf.ceo || emptyString;
            let employees = stockProf.fullTimeEmployees || Math.floor(Math.random() * 42069);
            let changes = stockProf.changes || emptyString;
            let changesPercentage = stockProf.changesPercentage || emptyString;
            let currency = stockProf.currency || emptyString;
            let country = stockProf.country || emptyString;
            let industry = stockProf.industry || `Amount of Employees: ${employees}`;
            let exchange = stockProf.exchange || emptyString;
            let sector = stockProf.sector || emptyString;
            let city = stockProf.city || emptyString;
            let stateOfficial = stockProf.state || emptyString;
            let zip = stockProf.zip || emptyString;
            let address = stockProf.address || emptyString;
    
            let stockElement = new Stock(name,image,officialSymbol,filterHistories(officialSymbol),price,website,description,ceo,employees,changes,changesPercentage,currency,country,industry,exchange,sector,city,stateOfficial,zip,address);
    
            // Filtering for Price Increase or Decrease
            if (changes >= 0) {
                condition = `positive`;
                plus = `+`;
            }  else {
                condition = `negative`;
            }
    
            $(`#stockBar`).addClass(`loaded`);

            this.setState(previousState => ({
                stocks: [...previousState.stocks, stockElement]
            }));

          })
      })
      
  }

  render() {

    if (!this.state.stocks.length) {
        return <div>Didnt get Stocks</div>
    }

    return (
      <div className="App">
        <userContext.Provider value={userData}>
          <Header />
          <Stockbar state={this.state} />
          <Main state={this.state} />
          <Footer />
        </userContext.Provider>
      </div>
    );  
  }
}