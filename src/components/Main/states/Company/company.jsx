import React from 'react';
import { render } from 'react-dom';
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

    async componentDidMount(companySymbol,copmany,profile,history) {   

        // Declaring Constants
        const companyData = document.querySelector(`.companyData`);
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
            event.target.src=`https://raw.githubusercontent.com/strawhat19/Whats-Your-Deal/main/public/assets/Stock-Icon-Circle-Icon.png`;
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

    }

    render() {
        return (
            <div className="company" id="company">
                <a href="../"><h1 class="nasdaq">COMPANY DATA</h1></a>
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
                <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.js"></script>
            </div>
        );
    }
}