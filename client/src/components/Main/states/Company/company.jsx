import React from 'react';
import { render } from 'react-dom';
import $ from 'jquery';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import "./sass/company.css";
import "./css/customCSS.css";
import userContext from '../../../../contexts/loginContext';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

export default class Company extends React.Component {

    state = {
        dates: [],
        prices: []
    }

    async componentDidMount() {

        // const user = useContext(userContext);

        const main = $(`main`);
        let companyLoading = $(`<div class="companyLoading"><div class="loader"></div> <h1>Company Profile is Loading...</h1></div>`);
        main.prepend(companyLoading);
        companyLoading.fadeIn(1000);
        
        // Image Fixing
        const images = document.querySelectorAll(`img`);
        images.forEach(image => {
            image.addEventListener(`error`,event => {
            event.target.src=`https://raw.githubusercontent.com/strawhat19/Whats-Your-Deal/main/public/assets/Stock-Icon-Circle-Icon.png`;
            })
        })

    }

    render() {
        const companyContainer = $(`#company`);
        companyContainer.hide();
        const companyData = document.querySelector(`.companyData`);
        let companySymbol = window.location.search.replace(`?symbol=`,``);

        const user = JSON.parse(localStorage.getItem(`Current User`)) || null;

        const deleteStock = () => {
            // Nothing Yet
        }

        const saveStock = () => {
            // Nothing Yet
        }

        const renderSaveDelete = () => {
            if (user) {
                return (
                    <div className={`saveDelete`}>
                        <span className={`saveBtn`}><i title={`Save Stock`} onClick={saveStock} class="fas fa-save"></i> Save Stock</span>
                        <span className={`deleteBtn`}><i title={`Delete Stock`} onClick={deleteStock} class="fas fa-trash"></i> Delete Stock</span>
                    </div>
                )
            } else {
                return (
                    <div className={`saveDelete`}>
                        Log In or Sign Up to Save
                    </div>
                )
            }
        }

        if (this.props.state.stocks.length > 14 && this.props.state.histories.length > 14) {
            // console.log(`App State:`);
            // console.log(this.props.state);

            let companyStock = this.props.state.stocks.filter(stock => stock.symbol === companySymbol)[0];
            let companyHistory = this.props.state.histories.filter(history => history.symbol === companySymbol)[0];

            // console.log(companyStock);
            // console.log(companyHistory);
            
            let {price,image,industry,name,changesPercentage,description,website,symbol,change,employees,ceo,sector,city,state} = companyStock;

            let plus = ``;
            let condition = ``;

            // Filtering for Price Increase or Decrease
            if (change >= 0) {
                condition = `positive`;
                plus = `+`;
            }  else {
                condition = `negative`;
            }

            companyData.innerHTML = `
                <div class="companyTitleRow">
                    <a href="${website}" target="_blank" title="${companySymbol}">
                        <img src="${image}" class="companyImage" alt="${companySymbol}">
                        <div class="titleText">
                            <span class="companyName">${name}</span>
                            <span class="industry">${industry}</span>
                        </div>
                    </a>
                </div>
                <p class="companyDescription"><span class="innerStockData">Stock Price: $${price} <span class="companyChanges ${condition}">Growth Percentage: ( ${plus}${change}% )</span></span> <span class="desc">${description}</span></p>
            `;

            let datesArray = [];
            let pricesArray = [];

            companyHistory.historical.forEach(date => {
                let month = date.date.split(`-`)[1];
                let day = date.date.split(`-`)[2];
                let monthDay = month + ` -` + day;
                datesArray.push(monthDay);
                // this.setState(previousState => ({
                //     dates: [...previousState.dates, monthDay]
                // }));
                localStorage.setItem(`Dates`, JSON.stringify(datesArray));
                pricesArray.push(date.close);
                // this.setState(previousState => ({
                //     prices: [...previousState.prices, date.close]
                // }));
                localStorage.setItem(`Prices`, JSON.stringify(pricesArray));
            })

            // this.setState({ dates: datesArray })
            // this.setState({ prices: pricesArray })
            // console.log(this.state);

            let companyLoading = $(`.companyLoading`);
            companyLoading.fadeOut(1000);
            companyContainer.fadeIn(1000);
        }
      
        return (
            <div className="company" id="company">
                <a className={`companyDataHeader backToHomeLink`} href="../"><h1 class="nasdaq">COMPANY DATA <span>(<span class="symbolOfComp">{companySymbol}</span>)</span></h1></a>
                <div class="companyDash" id="companyDash">
                    <div class="companyData"></div>
                    <div class="companyChart">
                        <Line options={{
                            responsive: true,
                            plugins: {
                              legend: {
                                position: 'top',
                              },
                              title: {
                                display: true,
                                text: 'Company Growth over the past 15 Business Days',
                              },
                            },
                        }}
                        data={{
                            labels: JSON.parse(localStorage.getItem(`Dates`)).reverse(),
                            datasets: [{
                                label: `Company Growth`,
                                backgroundColor: `#de1c1c`,
                                borderColor: `#de1c1c`,
                                fill: true,
                                pointRadius: 1,
                                responsive: true,
                                data: JSON.parse(localStorage.getItem(`Prices`)).reverse()
                            }]
                        }} />
                    </div>
                </div>
                {renderSaveDelete()}
                <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.js"></script>
            </div>
        );
    }
}