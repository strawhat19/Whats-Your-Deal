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

        $(`#stockBar`).hide();

        const stockAPIURL = `https://financialmodelingprep.com/api/v3/available-traded/list?limit=100&apikey=7e60778244bbb11a3e59192e565ed625`;
        const response = await fetch(stockAPIURL);
        stockList = await response.json();
        stockList.splice(100);

        console.log(`Stock Data:`);
        console.log(stockList);

        stockList.map((stock,index) => {
            const profileURL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${stock.symbol}`;
            fetch(profileURL).then(newResponse => newResponse.json()).then(profileList => {
                this.setState(previousState => ({
                    profiles: [...previousState.profiles, profileList]
                }));
            })
        })
        this.setState({ stocks : stockList, loading: false});
        console.log(this.state.profiles.splice(100));
    }

    render() {

        let profileArray = [...this.state.profiles] || JSON.parse(localStorage.getItem(`Profiles List`)) || [];
        profileArray.splice(100);

        if (!this.state.profiles.length) {
            return <div>Didnt get Stocks</div>
        }
        if (this.state.loading) {
            return <div>Loading...</div>
        }

        const stockProfileBarRender = profileArray.map((stockProfile,index) => {

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