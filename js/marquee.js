//declare constants-- touch marquee element
const marqueeElement = document.getElementById(`marqueeTest`);

// Fetch with async function
async function stockListFetch() {
  const response = await fetch(
    `https://financialmodelingprep.com/api/v3/available-traded/list?apikey=7e60778244bbb11a3e59192e565ed625`
  );
  let stocklist = await response.json();
  //splice array for workable number
  stocklist.splice(100);
  

//for each company make a div add a class
  stocklist.forEach((company, index, stockElement) => {
    stockElement = document.createElement(`div`);
    stockElement.classList.add(`stockElement`);

    //add symbol with a price
    stockElement.innerHTML = `${company.symbol} <span class="positive"> ($${company.price})</span>`;
    marqueeElement.classList.add(`marqueeAnim`);
    marqueeElement.append(stockElement);
  });
}

stockListFetch();
