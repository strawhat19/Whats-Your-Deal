// Declaring Constants
const body = document.body;
const spinner = document.getElementById(`spinnerSVG`);

// Div where we inject search results
const results = document.getElementById(`results`);

// Search Input
const searchInput = document.querySelector(`.input-field`);

// Click to make list pop up
const searchButton = document.getElementById(`clickMe`);

// For forcing whole object into array
let profilesArray = [];
let imagesArray = [];

// When user presses 'Enter' Key while they are inside the Search
searchInput.addEventListener(`keydown`, (event) => {
  if (event.keyCode === 13) {
    search();
  }
});

// When the Search Input is empty, empty results
searchInput.addEventListener(`input`,event => {
  searchInput.value === `` ? results.innerHTML = `` : true;
})

// Main Search Function
searchButton.addEventListener(`click`, (search = (searchTerm) => {
  // Emptying the Results Div on search
    results.innerHTML = ``;

    // Instatiating search term
    searchTerm = searchInput.value;

    // Fetching Data URL
    const url = `https:stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchTerm}&limit=10&exchange=NASDAQ`;
    
    // Fetch
      fetch(url)
      .then((response) => {
        // console.log(response);
        if (response.status != 200) {
          alert(`Fetch not successful`);
          return;
        }
        // Show Spinner
        spinner.classList.add(`show`);
        return response.json();
      })
      
      // Side Fetch
      .then((data) => {
        console.log(`Side Fetch Data is: `);
        console.log(data);
        // Remove Spinner
        setTimeout(() => {
          spinner.classList.remove(`show`);
        }, 1000); // Opening For Each Loop
        data.forEach((company, index, companyRow) => {
          const profileURL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${company.symbol}`;
          fetch(profileURL)
            .then((newResponse) => newResponse.json())
            .then((profileData) => {

            // Reinitializing Profile Array
            profilesArray.push(profileData);
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
                companyElement.innerHTML = `
                <span class="companyName">${name}</span> 
                <span class="companySymbol">(${symbol})</span>
                <span class="companyChanges ${condition}">(${plus}${changes})</span>
                `; // Injecting the Elements we Created into the Rows
                companyRow.prepend(companyImage);
                companyRow.append(companyElement);

                // Returning the Company Row
                return companyRow;
                // End Search Results Function
              });

              // Abstracted this code so it only appends rows on full word input
              results.append(companyRow);

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
      });
  })

  // End Main Search Function
);

// const checkInput = () => {
//   const userInput = formInput.value;
//   if (isNaN(userInput) === false) {
//     // it's a number
//     const userNumber = parseInt(userInput);
//     console.log("number", userNumber);
//     getDates();
//   } else if (isNaN(userInput)) {
//     // it's a string
//     console.log("string", userInput);
//     getStocks();
//   }
// }