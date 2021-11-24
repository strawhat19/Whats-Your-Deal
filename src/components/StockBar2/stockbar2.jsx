import React from 'react';
import ReactDOM from 'react-dom';
import "./sass/stockbar2.css";
import "./css/customCSS.css";

// Custom Stock Object
class Stock {
    constructor(name,symbol) {
        this.name = name;
        this.symbol = symbol;
    }

    logInfo() {
        Object.values(this).map(value => {
            console.log(value);
        })
    }
}

export default class Stockbar2 extends React.Component {

    state = {
        loading: true,
        stocks: [],
        profiles: JSON.parse(localStorage.getItem(`Profiles List`)) || []
    }

    async componentDidMount(stockList, stockBar, stockElement, companyRow, companyImage, profileList) {

        let profileArray = [];

        const stockAPIURL = `https://financialmodelingprep.com/api/v3/available-traded/list?limit=100&apikey=7e60778244bbb11a3e59192e565ed625`;
        const response = await fetch(stockAPIURL);
        stockList = await response.json();
        stockList.splice(100);

        console.log(`Stock Data:`);
        console.log(stockList);
        this.setState({ stocks : stockList, loading: false});
        this.setState({ profiles: JSON.parse(localStorage.getItem(`Profiles List`)), loading: false});

        // stockList.map((company, index) => {
        //     const stockProfileFetch = async () => {
        //         const stockProfileFetchURL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${company.symbol}`;
        //         const response = await fetch(stockProfileFetchURL);
        //         profileList = await response.json();
        //         // profileArray.push(profileList);
        //         localStorage.setItem(`Profiles List`, JSON.stringify(profileArray));
        //     }
        //     stockProfileFetch();
        // })

        profileArray = JSON.parse(localStorage.getItem(`Profiles List`)) || [];
        console.log(`Profile Data:`);
        console.log(profileArray);

        // profileArray.forEach((companyProfile, index) => {

        //     // Begin Profiles Array // Search Results Function
        //     let plus = ``;
        //     let condition = ``;
        //     let symbol = companyProfile.symbol;
        //     let name = companyProfile.profile.companyName || `Stock API`;
        //     let image = companyProfile.profile.image || `https://raw.githubusercontent.com/strawhat19/Whats-Your-Deal/main/public/assets/Stock-Icon-Circle-Icon.png`;
        //     let changes = companyProfile.profile.changes;

        //     // Filtering for Price Increase or Decrease
        //     if (changes >= 0) {
        //         condition = `positive`;
        //         plus = `+`;
        //     }  else {
        //         condition = `negative`;
        //     }
    
        //     // Creating Rows for Each Company
        //     companyRow = document.createElement(`div`);
        //     // companyRow = React.createElement(`div`, {}, '');
        //     companyImage = document.createElement(`img`); // Creating Image for Each Company

        //     // Setting the Attributes of the Company Image
        //     companyImage.setAttribute(`src`, image);
        //     companyImage.setAttribute(`class`, `companyIcon`);
        //     companyImage.setAttribute(`height`, `100px`);
        //     companyImage.setAttribute(`width`, `100px`);

        //     // Setting the Attributes of the Company Rows
        //     companyRow.setAttribute(`class`, `companyRow`);

        //     // Creating a New Element to Contain Company Data
        //     let companyElement = document.createElement(`a`);
        //     companyElement.setAttribute(`class`,`çompanyElement`);
        //     companyElement.setAttribute(`ìd`, index + 1);
        //     companyElement.setAttribute(`href`,`./html/company.html?symbol=${symbol}`);
        //     companyElement.innerHTML = `
        //     <span class="companyName">${name}</span> 
        //     <span class="companySymbol">(${symbol})</span>
        //     <span class="companyChanges">Hello</span>
        //     <span class="companyChanges ${condition}">(${plus}${changes})</span>
        //     `;
        //     // companyRow.prepend(companyImage);
        //     companyRow.append(companyElement);

        //     // Returning the Company Row
        //     return companyRow;
        // })

    }

    render() {

        if (!this.state.stocks.length) {
            return <div>Didnt get Stocks</div>
        }
        if (this.state.loading) {
            return <div>Loading...</div>
        }

        // const stockBarRender = this.state.stocks.map((stock,i) => {
        //     return (
        //     <div key={`stock${i}`}  className={`stock${i}`}>
        //         <div className={`companyElement ${stock.name.toString()}`}>{stock.name.toString()}</div>
        //     </div>
        //     )
        // });

        let stockListNew = [];

        const stockProfileBarRender = this.state.profiles.map((stockProfile,index) => {
            let emptyString = `Nothing to Show`;
            let stockProf = stockProfile.profile || emptyString;
            let price = stockProf.price || emptyString;
            console.log(stockProf);
            // let newStock = new Stock(stockProf.companyName,stockProfile.symbol);
            // stockListNew.push(newStock);
            return (
            <div key={`profile${index}`}  className={`companyElement profile-${index} ${stockProfile.symbol}`}>{stockProfile.symbol}</div>
            )
        });

        return (
            <div id="stockBar" className={`stockBar ${this.state.profiles[97].symbol}`}>
                {stockProfileBarRender}
            </div>
        )
    }
}