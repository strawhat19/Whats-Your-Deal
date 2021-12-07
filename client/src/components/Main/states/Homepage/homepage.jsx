import React from 'react';
import "./sass/homepage.css";
import "./css/customCSS.css";
import ReactSlidy from 'react-slidy';
import MissionStatement from './states/MissionStatement';
import AccessReal from './states/AccessReal';
import PortfolioTracking from './states/PortfolioTracking';
import LatestNews from './states/LatestNews';
import $ from 'jquery';
setInterval(() => {
    let sliderNextArrow = $(`.react-Slidy-next`);
    sliderNextArrow.click();
},7500)

export default class Homepage extends React.Component {
    render() {
        return (
            <>
            <link rel="stylesheet" href="https://unpkg.com/react-slidy/lib/styles.css" />
            <div className="appLogoHeader">
                <img src="https://raw.githubusercontent.com/strawhat19/Whats-Your-Deal/d4a9dee824a6172f64961e514f998ef99c5b45cb/public/assets/Stock-Icon-Circle-Icon.svg" className="App-logo" alt="logo" />
                <a className="App-link" href="/" target="_blank" rel="noopener noreferrer">What's Your Deal?!</a>
            </div>
            <ReactSlidy infiniteLoop>
                <MissionStatement />
                <AccessReal />
                <PortfolioTracking />
                <LatestNews />
            </ReactSlidy>
            </>
        );
    }
}