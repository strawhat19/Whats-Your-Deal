// Custom Stock Object
export default class Stock {
    constructor(name,image,symbol,price,website,description,ceo,employees,changesP,currency,country,industry,exchange,sector,city,state,zip,address,extra) {
        this.name = name;
        this.image = image;
        this.symbol = symbol;
        this.price = price;
        this.website = website;
        this.description = description;
        this.ceo = ceo;
        this.employees = employees;
        this.changesP = changesP;
        this.currency = currency;
        this.country = country;
        this.industry = industry;
        this.exchange = exchange;
        this.sector = sector;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.address = address;
        this.extra = extra;
    }
  
    logInfo() {
        Object.values(this).map(value => {
            console.log(value);
        })
    }
  }