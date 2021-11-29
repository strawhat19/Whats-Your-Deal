import React from 'react';
import './sass/App.css';
import Header from './components/Header/header';
import Stockbar from './components/StockBar/stockbar';
import Main from './components/Main/main';
import Footer from './components/Footer/footer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import $ from 'jquery';

// Custom Stock Object
class Stock {
  constructor(name,image,symbol,price,website,description,ceo,employees,changesP,currency,country,industry,exchange,sector,city,state,zip,address,extra) {
      this.name = name;
      this.image = image;
      this.symbol = symbol;
      this.price = price;
      this.website = website;
      this.description = description;
      this.ceo = ceo;
      this.employees = employees;
      this.changesP = changesP;
      this.currency = currency;
      this.country = country;
      this.industry = industry;
      this.exchange = exchange;
      this.sector = sector;
      this.city = city;
      this.state = state;
      this.zip = zip;
      this.address = address;
      this.extra = extra;
  }

  logInfo() {
      Object.values(this).map(value => {
          console.log(value);
      })
  }
}

export default class App extends React.Component {

  state = {
    loading: true,
    profiles: [],
    stocks: [],
    stocksArray: [],
    stockProfileBarRenderFunction: ``
  }

async componentDidMount(stockList) {
    $(`#stockBar`).hide();
    const stockAPIURL = `https://financialmodelingprep.com/api/v3/available-traded/list?limit=100&apikey=7e60778244bbb11a3e59192e565ed625`;
    const response = await fetch(stockAPIURL);
    stockList = await response.json();
    stockList.splice(100);
    this.setState({ stocks : stockList, loading: false});
    stockList.map((stock,index) => {
        let symbol = stock.symbol;
        const profileURL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`;
        fetch(profileURL).then(newResponse => newResponse.json()).then(profileList => {
            this.setState(previousState => ({
                profiles: [...previousState.profiles, profileList],
                loading: false
            }));
        })
    })
}

  render() {

    let STOCKS = this.state.stocksArray;
    STOCKS = [];

    if (!this.state.profiles.length) {
        return <div>Didnt get Stocks</div>
    }

    const stockProfileBarRender = this.state.profiles.map((stockProfile,index) => {

        let stockBarLoading = `Stock Bar is Loading: `;
        let APIString = `API`;
        let placeHolderImage = `https://raw.githubusercontent.com/strawhat19/Whats-Your-Deal/main/public/assets/Stock-Icon-Circle-Icon.png`;
        let stockProf = stockProfile.profile || stockBarLoading;
        let name = stockProf.companyName || stockBarLoading;
        let emptyString = name || `Loading...`;
        let plus = ``;
        let condition = ``;
        let image = stockProf.image || placeHolderImage;
        let officialSymbol = stockProfile.symbol || APIString;
        let price = stockProf.price || emptyString;
        let website = stockProf.website || emptyString;
        let description = stockProf.description || emptyString;
        let ceo = stockProf.ceo || emptyString;
        let employees = stockProf.fullTimeEmployees || emptyString;
        let changes = stockProf.changes || emptyString;
        let changesPercentage = stockProf.changesPercentage || emptyString;
        let currency = stockProf.currency || emptyString;
        let country = stockProf.country || emptyString;
        let industry = stockProf.industry || emptyString;
        let exchange = stockProf.exchange || emptyString;
        let sector = stockProf.sector || emptyString;
        let city = stockProf.city || emptyString;
        let stateOfficial = stockProf.state || emptyString;
        let zip = stockProf.zip || emptyString;
        let address = stockProf.address || emptyString;

        let stockElement = new Stock(name,image,officialSymbol,price,website,description,ceo,employees,changesPercentage,currency,country,industry,exchange,sector,city,stateOfficial,zip,address);
        STOCKS.push(stockElement);
        // console.log(`Stock Profiles:`);
        // console.log(STOCKS);

        // Filtering for Price Increase or Decrease
        if (changes >= 0) {
            condition = `positive`;
            plus = `+`;
        }  else {
            condition = `negative`;
        }

        $(`#stockBar`).addClass(`loaded`);

        return (
        <div key={`profile${index}`}  id={`${stockProfile.symbol}`} className={`companyElement profile-${index} ${stockProfile.symbol}`}>
            <a href={website} target="_blank" title={name}>
                <img className="companyIcon" src={image} alt="Company Image"></img>
                <span className={`companySymbol ${officialSymbol}`}>{officialSymbol}</span>
                <span className={`companyChanges ${condition}`}>{plus} {changes}</span>
            </a>
        </div>
        )
    });

    return (
      <div className="App">
        <Header />
        <Stockbar state={this.state} />
        <Main state={this.state} />
        <div id="stockBar" className={`stockBar`}>
          {stockProfileBarRender} 
        </div>
        <Footer />
      </div>
    );  
  }
}