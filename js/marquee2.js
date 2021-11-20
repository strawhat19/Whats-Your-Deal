// window.addEventListener('DOMContentLoaded', (event) => {
 // Declare constants-- touch marquee element
const marqueeElement = document.getElementById(`marqueeTest`);

// Fetch with async function
async function stockListFetch() {
  const response = await fetch(
    `https://financialmodelingprep.com/api/v3/available-traded/list?apikey=7e60778244bbb11a3e59192e565ed625`
  );
  let stocklist = await response.json();
  // splice array for workable number
  stocklist.splice(100);

// for each company make a div add a class
  stocklist.forEach((company, index, stockElement) => {
    let profileURL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${company.symbol}`;
    fetch(profileURL)
            .then((newResponse) => newResponse.json())
            .then((profileData) => {

            // Reinitializing Profile Array
            profilesArray.push(profileData);
            console.log(profilesArray)
            profilesArray.forEach((company, index) => {

              // Begin Profiles Array // Search Results Function
                let plus = ``;
                let condition = ``;
                let symbol = company.symbol;
                let image = company.profile.image;
                let changes = company.profile.changes.toFixed(2);
                let name = company.profile.companyName;

                // Filtering for Price Increase or Decrease
                if (changes >= 0) {
                  condition = `positive`;
                  plus = `+`;
                 }  else {
                  condition = `negative`;
                }
               
                // Creating Rows for Each Company
                companyRow = document.createElement(`div`);
                let companyImage = document.createElement(`img`); // Creating Image for Each Company
    
                // Setting the Attributes of the Company Image
                companyImage.setAttribute(`src`, image);
                companyImage.setAttribute(`class`, `companyIcon`);
                companyImage.setAttribute(`height`, `100px`);
                companyImage.setAttribute(`width`, `100px`);

                // Setting the Attributes of the Company Rows
                companyRow.classList.add(`companyRow`);

                // Creating a New Element to Contain Company Data
                let companyElement = document.createElement(`a`);
                companyElement.setAttribute(`href`,`./html/company.html?symbol=${symbol}`);
                companyElement.classList.add(`çompanyElement`);
                companyElement.setAttribute(`ìd`, index + 1);
                // companyElement.innerHTML = `
                // <span class="companyName">${name}</span> 
                // <span class="companySymbol">(${symbol})</span>
                // <span class="companyChanges ${condition}">(${plus}${changes})</span>
                // `;
                companyElement.innerHTML = `
                <span class="companySymbol">${symbol}</span>
                <span class="companyChanges ${condition}">(${plus}${changes})</span>
                `; // Injecting the Elements we Created into the Rows
                companyRow.prepend(companyImage);
                companyRow.append(companyElement);

                // Returning the Company Row
                return companyRow;
                // End Search Results Function
              });

              // Abstracted this code so it only appends rows on full word input
              marqueeElement.append(companyRow);
              // stockElement = document.createElement(`div`);
              // stockElement.classList.add(`stockElement`);
              // // add symbol with a price
              // let companyElement = document.createElement(`a`);
              // let companyImage = document.createElement(`img`); // Creating Image for Each Company
              // // Setting the Attributes of the Company Image
              // companyImage.setAttribute(`src`, company);
              // companyImage.setAttribute(`class`, `companyIcon`);
              // companyImage.setAttribute(`height`, `100px`);
              // companyImage.setAttribute(`width`, `100px`);
              // companyElement.setAttribute(`href`,`./html/company.html?symbol=${company.symbol}`);
              // companyElement.classList.add(`companyElement`);
              // companyElement.setAttribute(`ìd`, index + 1);
              // stockElement.innerHTML = `${company.symbol} <span class="positive"> | ($${company.price})</span>`;
              // marqueeElement.classList.add(`marqueeAnim`);
              // companyElement.append(stockElement)
              // marqueeElement.append(companyElement);

              // Image Fixing
              const images = document.querySelectorAll(`img`);
              images.forEach(image => {
                image.addEventListener(`error`,event => {
                  event.target.src=`../img/Stock-Icon-Circle-Icon.svg`;
                })
              })

              // Highlighting Searched Text on Company Names
              const companyNames = document.querySelectorAll(`.companyName`);
              companyNames.forEach(name => {
                let filteredCharacters = searchTerm.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
                let filter = new RegExp(`${filteredCharacters}`,`gi`);
                name.innerHTML = name.textContent.replace(filter,match => `<mark>${match}</mark>`);
              })

              // Highlighting Searched Text on Company Symbols
              const companySymbols = document.querySelectorAll(`.companySymbol`);
              companySymbols.forEach(symbol => {
                let filteredCharacters = searchTerm.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
                let filter = new RegExp(`${filteredCharacters}`,`gi`);
                symbol.innerHTML = symbol.textContent.replace(filter,match => `<mark>${match}</mark>`);
              })

          });
  });
}

stockListFetch();

// });