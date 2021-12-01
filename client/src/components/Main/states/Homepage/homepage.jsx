import React from 'react';
import "./sass/homepage.css";
import "./css/customCSS.css";

export default class Homepage extends React.Component {
    render() {
        return (
            <>
            <img src="https://raw.githubusercontent.com/strawhat19/Whats-Your-Deal/d4a9dee824a6172f64961e514f998ef99c5b45cb/public/assets/Stock-Icon-Circle-Icon.svg" className="App-logo" alt="logo" />
            <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">What's Your Deal?!</a>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.js"></script>
            </>
        );
    }
}