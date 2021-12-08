import React from 'react';
import "./sass/dashboard.css";

export default class Dashboard extends React.Component {
    render() {
        console.log(this.props.state);
        let plus = ``;
        let condition = ``;

        const deleteStock = () => {
            // Nothing Yet
        }

        return (
            <div className="dashboard">
                <div className={`dashboardTitleRow`}>
                    <div className="dashboardTitleInnerRow">
                        <div className={`userNameColumn titleField`}>{JSON.parse(localStorage.getItem(`Current User`)).user.name}'s Stocks:</div>
                        <div className={`userStockColumn titleField`}>Stock</div>
                        <div className={`stockSymbolColumn titleField`}>Symbol</div>
                        <div className={`stockPriceColumn titleField`}>Price</div>
                        <div className={`stockPriceColumn titleField`}>Delete</div>
                    </div>
                </div>
                {JSON.parse(localStorage.getItem(`Current User`)).user.userStocks.map((stock,index) => {
                    
                    if (stock.changesPercentage >= 0) {
                        condition = `positive`;
                        plus = `+`;
                    }  else {
                        plus = ``;
                        condition = `negative`;
                    }

                    return (
                        <div key={`profile-${index+1}`}  id={`${stock.symbol}`} className={`companyElement dashboardElement profile-${index+1} ${stock.symbol}`}>
                            <div title={stock.name} className={`stockLink ${stock.symbol}`}>
                                <span className="companyIndex">{index + 1}.</span>
                                <a href={`./company?symbol=${stock.symbol}`}>
                                    <img className="companyIcon" src={stock.image} alt="Company Image"></img>
                                </a>
                                <span className={`companySymbol ${stock.symbol}`}>{stock.symbol}</span>
                                <span className={`companyChanges ${condition}`}>{plus} {stock.changesPercentage.split(``).length > 7 ? stock.changesPercentage.split(``).reverse().splice(4).reverse() : stock.changesPercentage}</span>
                                <span className={`deleteButton`}><i title={`Delete ${stock.symbol} Stock`} onClick={deleteStock} class="fas fa-trash"></i></span>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}
