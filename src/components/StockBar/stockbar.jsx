import React from 'react';
import "./sass/stockbar.css";

function Stockbar(stockBar, stockElement, companyRow, companyImage, profilesArray, stockList) {

    const [isStockList, setIsStockList] = React.useState(false);

    const isntStockList = () => {
        setIsStockList(false);
     };  
     const IsStockList = () => {
        setIsStockList(true);
     };

    stockBar = document.getElementById(`stockBar`);
    profilesArray = JSON.parse(localStorage.getItem('Profiles List')) || [];

    // fetch(`https://financialmodelingprep.com/api/v3/available-traded/list?apikey=7e60778244bbb11a3e59192e565ed625`)
    // .then(response => {
    //     return response.json();
    // }).then(data => {

    //     data.splice(100);
    //     stockList = [...new Set(data)];
        stockList = JSON.parse(localStorage.getItem('Stock List')) || [];
        console.log('Stock API Data Is:');
        console.log(stockList);
        // localStorage.setItem(`Stock List`, JSON.stringify(stockList));
        profilesArray.shift();
        console.log('Profile List Modded:');
        console.log(profilesArray);

        stockList.map((company, index) => {
            // let profileURL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${company.symbol}`;
            // fetch(profileURL)
            //     .then((newResponse) => newResponse.json())
            //     .then((profileData) => {

            //     // Reinitializing Profile Array
            //     profilesArray.push(profileData);
                profilesArray = JSON.parse(localStorage.getItem('Profiles List')) || [];
                // localStorage.setItem(`Profiles List`, JSON.stringify(profilesArray));
                profilesArray.map((companyProfile, index) => {

                    // Begin Profiles Array // Search Results Function
                    // let plus = ``;
                    // let condition = ``;
                    let symbol = companyProfile.symbol;
                    let name = companyProfile.profile.companyName;
                    // let image = companyProfile.profile.image;
                    // let changes = companyProfile.profile.changes;

                    // Filtering for Price Increase or Decrease
                    // if (changes >= 0) {
                    //     condition = `positive`;
                    //     plus = `+`;
                    // }  else {
                    //     condition = `negative`;
                    // }
            
                    // Creating Rows for Each Company
                    companyRow = document.createElement(`div`);
                    // companyImage = document.createElement(`img`); // Creating Image for Each Company
        
                    // Setting the Attributes of the Company Image
                    // companyImage.setAttribute(`src`, image);
                    // companyImage.setAttribute(`class`, `companyIcon`);
                    // companyImage.setAttribute(`height`, `100px`);
                    // companyImage.setAttribute(`width`, `100px`);

                    // Setting the Attributes of the Company Rows
                    companyRow.setAttribute(`class`, `companyRow`);

                    // Creating a New Element to Contain Company Data
                    let companyElement = document.createElement(`a`);
                    companyElement.setAttribute(`href`,`./html/company.html?symbol=${symbol}`);
                    companyElement.setAttribute(`class`,`çompanyElement`);
                    companyElement.setAttribute(`ìd`, index + 1);
                    companyElement.innerHTML = `
                    <span class="companyName">${name}</span> 
                    <span class="companySymbol">(${symbol})</span>
                    <span class="companyChanges">Hello</span>`; // Injecting the Elements we Created into the Rows
                    // <span class="companyChanges ${condition}">(${plus}${changes})</span>`; // Injecting the Elements we Created into the Rows
                    // companyRow.prepend(companyImage);
                    companyRow.append(companyElement);

                    // Returning the Company Row
                    return companyRow;
                    // End Search Results Function
                });

                // Abstracted this code so it only appends rows on full word input
                stockBar.append(companyRow);

                // Image Fixing
                // const images = document.querySelectorAll(`img`);
                // images.forEach(image => {
                //     image.addEventListener(`error`,event => {
                //         event.target.src=`../img/Stock-Icon-Circle-Icon.svg`;
                //     })
                // })

                // let searchTerm = 'Hello';

                // // Highlighting Searched Text on Company Names
                // const companyNames = document.querySelectorAll(`.companyName`);
                // companyNames.forEach(name => {
                // let filteredCharacters = searchTerm.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
                // let filter = new RegExp(`${filteredCharacters}`,`gi`);
                // name.innerHTML = name.textContent.replace(filter,match => `<mark>${match}</mark>`);
                // })

                // // Highlighting Searched Text on Company Symbols
                // const companySymbols = document.querySelectorAll(`.companySymbol`);
                // companySymbols.forEach(symbol => {
                // let filteredCharacters = searchTerm.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
                // let filter = new RegExp(`${filteredCharacters}`,`gi`);
                // symbol.innerHTML = symbol.textContent.replace(filter,match => `<mark>${match}</mark>`);
                // })

            // }); // Inner Fetch

            stockElement = document.createElement(`div`);
            stockElement.setAttribute(`class`,`stockElement`);

            // Add symbol with a price
            let companyElement = document.createElement(`a`);
            let companyImage = document.createElement(`img`); // Creating Image for Each Company

            // Setting the Attributes of the Company Image
            companyImage.setAttribute(`src`, company);
            companyImage.setAttribute(`class`, `companyIcon`);
            companyImage.setAttribute(`height`, `100px`);
            companyImage.setAttribute(`width`, `100px`);
            companyElement.setAttribute(`href`,`./html/company.html?symbol=${company.symbol}`);
            companyElement.setAttribute(`class`,`companyElement ${company.symbol}`);
            companyElement.setAttribute(`ìd`, index + 1);
            stockElement.innerHTML = `${company.symbol} <span class="positive"> | (${company.price})</span>`;
            companyElement.append(stockElement);
            stockBar.append(companyElement);
        });

    // }) // End Primary Fetch

    return (
        <div className="stockBar marquee" id="stockBar"></div>
    );
}
 
export default Stockbar;