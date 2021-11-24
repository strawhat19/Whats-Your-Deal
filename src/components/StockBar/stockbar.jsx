import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import "./sass/stockbar.css";
import "./css/customCSS.css";

export default class Stockbar extends React.Component {

    state = {
        loading: true,
        stocks: [],
        profiles: JSON.parse(localStorage.getItem(`Profiles List`)) || []
    }

    // Custom Stock Object
    // class Stock {
    //     constructor(name,symbol) {
    //         this.name = name;
    //         this.symbol = symbol;
    //     }

    //     logInfo() {
    //         Object.values(this).map(value => {
    //             console.log(value);
    //         })
    //     }
    // }

    async componentDidMount(stockList, stockElement, companyRow, companyImage, profileList) {

        let profileArray = [];
        $(`#stockBar`).hide();

        const stockAPIURL = `https://financialmodelingprep.com/api/v3/available-traded/list?limit=100&apikey=7e60778244bbb11a3e59192e565ed625`;
        const response = await fetch(stockAPIURL);
        stockList = await response.json();
        stockList.splice(100);

        console.log(`Stock Data:`);
        console.log(stockList);
        this.setState({ stocks : stockList, loading: false});
        this.setState({ profiles: JSON.parse(localStorage.getItem(`Profiles List`)), loading: false});

        profileArray = JSON.parse(localStorage.getItem(`Profiles List`)) || [];
        console.log(`Profile Data:`);
        console.log(profileArray);

    }

    render() {

        if (!this.state.stocks.length) {
            return <div>Didnt get Stocks</div>
        }
        if (this.state.loading) {
            return <div>Loading...</div>
        }

        const stockProfileBarRender = this.state.profiles.map((stockProfile,index) => {

            let emptyString = `Nothing to Show`;
            let placeHolderImage = `https://raw.githubusercontent.com/strawhat19/Whats-Your-Deal/main/public/assets/Stock-Icon-Circle-Icon.png`;
            let stockProf = stockProfile.profile || emptyString;
            let plus = ``;
            let condition = ``;
            let image = stockProf.image || placeHolderImage;
            let website = stockProf.website || emptyString;
            let changes = stockProf.changes || emptyString;
            let name = stockProf.companyName || emptyString;
            let price = stockProf.price || emptyString;
            let address = stockProf.address || emptyString;
            let ceo = stockProf.ceo || emptyString;
            let changesPercentage = stockProf.changesPercentage || emptyString;
            let country = stockProf.country || emptyString;
            let currency = stockProf.currency || emptyString;
            let industry = stockProf.industry || emptyString;
            let description = stockProf.description || emptyString;
            let exchange = stockProf.exchange || emptyString;
            let fullTimeEmployees = stockProf.fullTimeEmployees || emptyString;
            let sector = stockProf.sector || emptyString;
            let city = stockProf.city || emptyString;
            let state = stockProf.state || emptyString;
            let zip = stockProf.zip || emptyString;

            // Filtering for Price Increase or Decrease
            if (changes >= 0) {
                condition = `positive`;
                plus = `+`;
            }  else {
                condition = `negative`;
            }

            $(`#stockBar`).addClass(`loaded`);
            $(`.stockBar.loaded`).fadeIn(5000);

            return (
            <div key={`profile${index}`}  id={`${stockProfile.symbol}`} className={`companyElement profile-${index} ${stockProfile.symbol}`}>
                <a href={website} target="_blank" title={name}>
                    <img className="companyIcon" src={image} alt="Company Image"></img>
                    <span className={`companySymbol ${stockProfile.symbol}`}>{stockProfile.symbol}</span>
                    <span className={`companyChanges ${condition}`}>{plus} {changes}</span>
                </a>
            </div>
            )
        });

        return (
            <div id="stockBar" className={`stockBar`}>
                {stockProfileBarRender}
            </div>
        )
    }
}