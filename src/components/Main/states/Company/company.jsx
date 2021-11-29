import React from 'react';
import "./sass/company.css";
import "./css/customCSS.css";

export default class Company extends React.Component {

    async componentDidMount(companySymbol,copmany,profile,history) {   

        // Declaring Constants
        const companyDash = document.querySelector(`.companyDash`);
        const companyData = document.querySelector(`.companyData`);
        const companyChart = document.querySelector(`.companyChart`);
        const companyChartCanvas = document.getElementById(`lineChart`);
        // companySymbol = window.location.search.replace("?symbol=", "");
        companySymbol = `AAPL`;

        // Getting Profiles
        const profileResponse = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${companySymbol}`);

        profile = await profileResponse.json();
        let {profile: {price,image,industry,companyName:name,changes,description,website,changesPercentage:percent},symbol} = profile;

        let plus = ``;
        let condition = ``;

        // Filtering for Price Increase or Decrease
        if (changes >= 0) {
        condition = `positive`;
        plus = `+`;
        }  else {
        condition = `negative`;
        }

        // Taking Destructured Objects and injecting them into the markdown
        companyData.innerHTML = `
        <div class="companyTitleRow">
            <img src="${image}" class="companyImage" alt="${companySymbol}">
            <a href="${website}" target="_blank" title="${companySymbol}">
                <span class="companyName">${name}</span>
                <span class="industry">(${industry})</span>
            </a>
        </div>
        <div class="stockPrice">Stock Price: $${price} <span class="companyChanges ${condition}">(${plus}${changes}%)</span></div>
        <p class="companyDescription"><span>Description:</span> ${description}</p>
        `;

        if (industry === ``) {
        document.querySelector(`.industry`).innerHTML = `(${companySymbol})`;
        }

        if (website === ``) {
        document.querySelector(`.companyTitleRow a`).setAttribute(`href`,`../`);
        }

        // Image Fixing
        const images = document.querySelectorAll(`img`);
        images.forEach(image => {
            image.addEventListener(`error`,event => {
            event.target.src=`../img/Stock-Icon-Circle-Icon.svg`;
            })
        })

        // Getting History
        const profileHistory = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${companySymbol}?serietype=line`);
        history = await profileHistory.json();
        history.historical.splice(15);

        let datesArray = [];
        let pricesArray = [];

        history.historical.forEach(date => {
        let month = date.date.split(`-`)[1];
        let day = date.date.split(`-`)[2];
        let monthDay = month + ` -` + day;
        datesArray.push(monthDay);
        localStorage.setItem(`Dates`, JSON.stringify(datesArray));
        pricesArray.push(date.close);
        localStorage.setItem(`Prices`, JSON.stringify(pricesArray));
        })

        // // companyChartCanvas
        // const lineChart = new Chart(companyChartCanvas, {
        // type: `line`,
        // data: {
        //         labels: JSON.parse(localStorage.getItem(`Dates`)).reverse(),
        //         datasets: [{
        //             label: `Company Growth`,
        //             backgroundColor: `rgba(222, 28, 28, 50%)`,
        //             borderColor: `#de1c1c`,
        //             fill: true,
        //             pointRadius: 1,
        //             responsive: true,
        //             data: JSON.parse(localStorage.getItem(`Prices`)).reverse()
        //         }]
        //     }
        // })

    }

    render() {
        return (
            <div className="company" id="company">
                <a href="../"><h1 class="nasdaq">NASDAQ EXCHANGE</h1></a>
                <div class="companyDash" id="companyDash">
                    <div class="companyData"></div>
                    <div class="companyChart">
                        <div class="chartTitle">Company Growth over the past 15 Business Days</div>
                        <canvas class="lineChart" id="lineChart"></canvas>
                    </div>
                </div>
            </div>
        );
    }
}