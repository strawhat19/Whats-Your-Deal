// Company JS
console.log(`Company JS!`);

// Declaring Constants
const companyDash = document.querySelector(`.companyDash`);
const companyData = document.querySelector(`.companyData`);
const companyChart = document.querySelector(`.companyChart`);
const companyChartCanvas = document.getElementById(`lineChart`);
const spinner = document.getElementById(`spinnerSVG`);
const companySymbol = window.location.search.replace("?symbol=", "");

// Asyncronous Fetching
stockProfileFetch = async (profile,history) => {

  // Getting Profiles
  const profileResponse = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${companySymbol}`);

  profile = await profileResponse.json();
  // console.log(`Profile Data is`);
  // console.log(profile);

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
  <div class="stockPrice">Stock Price: $${price} 
    <span class="companyChanges ${condition}">(${plus}${changes}%)</span>
  </div>
  <p class="companyDescription">
    <span>Description:</span>
    ${description}
  </p>
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
  // console.log(`History Data is`);
  // console.log(history);

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

  // companyChartCanvas
  const lineChart = new Chart(companyChartCanvas, {
    type: `line`,
    data: {
      labels: JSON.parse(localStorage.getItem(`Dates`)).reverse(),
      datasets: [{
        label: `Company Growth`,
        backgroundColor: `rgba(222, 28, 28, 50%)`,
        borderColor: `#de1c1c`,
        fill: true,
        pointRadius: 1,
        responsive: true,
        data: JSON.parse(localStorage.getItem(`Prices`)).reverse()
      }]
    }
  })

}

setTimeout(() => {
  spinner.remove();
},3000)

// Invoking Page Load Functions
stockProfileFetch();

// const params = new URLSearchParams(window.location.search);

// let stockSymbol = params.get("symbol");
// let companyData = "";

// const companyNaame = document.getElementById("companyName");
// const companyImage = document.getElementById("companyImage");
// const companyDescription = document.getElementById("company-text");
// const companyWebsite = document.getElementById("company-link");
// const loadingSpinner = document.getElementById("loading-spinner");
// const companyCard = document.getElementById("company-card");
// const stockTicker = document.getElementById("stock-ticker");
// const stockPrice = document.getElementById("stock-price");
// const stockChangePercentage = document.getElementById(
//   "stock-change-percentage"
// );

// // console.log(`here is stock symbol ${stockSymbol}`);

// //chart script//

// const createChart = async (dataArray) => {
//   const canvas = document.getElementById("myChart").getContext("2d");
//   const historicalDates = dataArray.map((el) => {
//     return el.date;
//   });
//   const historicalPrices = dataArray.map((el) => {
//     return el.close;
//   });
//   console.log(historicalDates);
//   console.log(historicalPrices);
//   let dataChart = new Chart(canvas, {
//     type: "bar",
//     data: {
//       labels: historicalDates.reverse(),
//       datasets: [
//         {
//           label: "Stock price over time",
//           data: historicalPrices.reverse(),
//           backgroundColor: "blue",
//           borderColor: "black",
//           hoverBorderWidth: 1,
//           hoverBorderColor: "black",
//         },
//       ],
//     },
//     options: {
//       responsive: false,
//       maintainAspectRatio: false,
//     },
//   });
// };

// //begin stock script //
// const calcStockChange = (num) => {
//   let newNum = parseFloat(num);
//   //   console.log(newNum);
//   //   console.log(typeof newNum);
//   const roundedNum = Math.round(newNum * 10) / 10;
//   if (isNaN(num)) {
//     stockChangePercentage.classList.add("negative");
//     return 0;
//   }
//   if (roundedNum > 0) {
//     stockChangePercentage.classList.add("positive");
//   } else {
//     stockChangePercentage.classList.add("negative");
//   }
//   return roundedNum;
// };

// const stockHistory = async (stockTick) => {
//   const response = await fetch(
//     `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${stockTick}?serietype=line`
//   );
//   const data = await response.json();
//   console.log(data.historical);
//   return data.historical;
// };
// // calcStockChange(1.234);
// const getStockHistory = async (stock) => {
//   try {
//     companyCard.classList.add("hidden");
//     loadingSpinner.classList.remove("hidden");
//     const response = await fetch(
//       `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${stock}`
//     );
//     const data = await response.json();
//     console.log(data.profile);

//     companyData = data.profile;
//     const {
//       companyName,
//       website,
//       description,
//       image,
//       price,
//       changesPercentage,
//     } = companyData;
//     companyNaame.textContent = companyName;
//     companyDescription.textContent = description;
//     companyWebsite.href = website;
//     companyWebsite.textContent = `Visit ${companyName}'s website`;
//     stockTicker.textContent = stockSymbol;
//     stockPrice.textContent = price;
//     companyImage.src = image;
//     stockChangePercentage.textContent = `${calcStockChange(
//       changesPercentage
//     )}%`;
//     try {
//       createChart(await stockHistory(stockSymbol));
//       loadingSpinner.classList.add("hidden");
//       companyCard.classList.remove("hidden");
//     } catch (error) {
//       console.log(error);
//     }
//     return data.profile;
//   } catch (error) {
//     console.log(error);
//   }
// };
// getStockHistory(stockSymbol);