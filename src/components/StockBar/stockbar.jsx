import React from 'react';
import "./sass/stockbar.css";

function Stockbar() {

    function stockFetch() {
        // Declare constants-- touch marquee element
        const stockBar = document.getElementById(`stockBar`);

        fetch(`https://financialmodelingprep.com/api/v3/available-traded/list?apikey=7e60778244bbb11a3e59192e565ed625`)
        .then(response => {
            return response.json();
        }).then(stockList => {
            console.log('Stock API Data Is:');
            stockList.splice(100);
            console.log(stockList);
        })
    }
    
    // stockFetch();

    return <div class="stockBar" id="stockBar"></div>;
}
 
export default Stockbar;