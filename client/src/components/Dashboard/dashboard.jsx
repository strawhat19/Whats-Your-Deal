import React from 'react'
import "./dashboard.css"

export default class Dashboard extends React.Component {
    render() {
        console.log(this.props.state);
        let plus = ``;
        let condition = ``;
        return (
            <div className="dashboard">
                {JSON.parse(localStorage.getItem(`Current User`)).user.name || `No User Found`}'s Stocks:
                {JSON.parse(localStorage.getItem(`Current User`)).user.userStocks.map((stock,index) => {
                     if (stock.changesPercentage >= 0) {
                        condition = `positive`;
                        plus = `+`;
                    }  else {
                        condition = `negative`;
                    }

                    return (
                        <div key={`profile${index}`}  id={`${stock.symbol}`} className={`companyElement profile-${index} ${stock.symbol}`}>
                            <a href={`./company?symbol=${stock.symbol}`} title={stock.name} className={`stockLink ${stock.symbol}`}>
                                <span className="companyIndex">{index}</span>
                                <img className="companyIcon" src={stock.image} alt="Company Image"></img>
                                <span className={`companySymbol ${stock.symbol}`}>{stock.symbol}</span>
                                <span className={`companyChanges ${condition}`}>{plus} {stock.changesPercentage.split(``).length > 7 ? stock.changesPercentage.split(``).reverse().splice(4).reverse() : stock.changesPercentage}</span>
                            </a>
                        </div>
                    )
                })}
            </div>
        )
    }
}
