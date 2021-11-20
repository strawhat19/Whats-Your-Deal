// Declaring Constants
const body = document.body;
const spinner = document.getElementById(`spinnerSVG`);

// User input instead of AA
const results = document.getElementById(`results`);

// Search Input
const searchInput = document.querySelector(`.input-field`);

// Click to make list pop up
const searchButton = document.getElementById(`clickMe`);

//for forcing whole object into array
let newDataArray = [];
//comparing search to all search terms
//add delay to fix double searches

searchInput.addEventListener(`input`, (search = (searchTerm) => {
    results.innerHTML = ``;
    searchTerm = searchInput.value;
    const symbol = searchTerm;

    // Fetching Data
    const url = `https:stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${symbol}&limit=10&exchange=NASDAQ`;
    // let loader = document.createElement(`div`);
    // loader.innerHTML = `<div class="spinner"></div>`;
    // console.log(loader);
    // document.getElementById("spinner").innerHTML = loader;
    setTimeout(() => {
      fetch(url)
      .then((response) => {
        console.log(response);
        if (response.status != 200) {
          alert(`Fetch not successful`);
          return;
        }
        // Show Spinner
        spinner.classList.add(`show`);
        return response.json();
      })
      
      //sidefetch
      .then((data) => {
        console.log(data);
        // Remove Spinner
        setTimeout(() => {
          spinner.classList.remove(`show`);
        }, 1000);
        data.forEach((company, index, companyRow) => {
          const TestURL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${company.symbol}`;
          fetch(TestURL)
            .then((newResponse) => newResponse.json())
            .then((newData) => {
            newDataArray.push(newData);
             newDataArray.filter(company => {
                // Using Reg Ex or a Regular Expression
                const regex = new RegExp(`^${searchInput.value}`, `gi`);
                return company.symbol.match(regex);
             })
            //  newDataArray = [...new Set(newDataArray)];
            //  localStorage.setItem(`Companies`, JSON.stringify(newDataArray));
             newDataArray.forEach((company, index) => {
                // let name = company.profile.companyName;
                // let image = company.profile.image;
                // let changes = company.profile.changes;
                // let symbol = company.symbol;
                // Object Destructuring
                let { companyName, image, changes } = company.profile;
                let { symbol } = company;
                let condition = ``;
                let plus = ``;
                // changes >= 0 ? condition = `positive` : condition = `negative`;
                if (changes >= 0) {
                  condition = `positive`;
                  plus = `+`;
                 }  else {
                  condition = `negative`;
                }
                // if (`.companyChanges.positive`) {
                //   const positiveCompanies = document.querySelectorAll(`.positive`)
                //   console.log(positiveCompanies);
                //   positiveCompanies.forEach(positiveCompany => {
                //     positiveCompany.prepend(`+`);
                //   })
                // }
                // let website = company.profile.website;
                //company image(make element, give it src class and attributes for the class)
                companyRow = document.createElement(`div`);
                let companyImage = document.createElement(`img`);
                companyImage.setAttribute(`src`, image);
                companyImage.setAttribute(`class`, `companyIcon`);
                companyImage.setAttribute(`height`, `100px`);
                companyImage.setAttribute(`width`, `100px`);
                companyRow.classList.add(`companyRow`);
                let companyElement = document.createElement(`a`);
                companyElement.setAttribute(
                  `href`,
                  `./html/company.html?symbol=${symbol}`
                );
                //add name of company to element add symbol after add image before
                //still need to add stock change red if down green otherwise
                companyElement.classList.add(`çompanyElement`);
                companyElement.setAttribute(`ìd`, index + 1);
                companyElement.innerHTML = `
                <span class="companyName">${index} | ${companyName}</span> 
                <span class="companySymbol">(${symbol})</span>
                <span class="companyChanges ${condition}">(${plus}${changes})</span>
                `;
                companyRow.prepend(companyImage);
                companyRow.append(companyElement);
                return companyRow;
              });
              results.append(companyRow);
            });
        });
      });
    },1000)
  })
);

searchButton.addEventListener(`click`, search);