import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import "./sass/stockbar.css";
import "./css/customCSS.css";

export default class Stockbar extends React.Component {

    async componentDidMount() {
        // Gets rid of Placeholder Element
        let stockBarPH = $(`#API`);
        if (stockBarPH) stockBarPH.remove();
    }

    render() {
        // console.log(this.props.state);
        let plus = ``;
        let condition = ``;
    
        return (
            <div id="stockBar" className={`stockBar`}>
                {this.props.state.stocks && this.props.state.stocks.map((stock,index) => {

                    if (stock.changesPercentage >= 0) {
                        condition = `positive`;
                        plus = `+`;
                    }  else {
                        condition = `negative`;
                    }

                    return (
                        <div key={`profile${index}`}  id={`${stock.symbol}`} className={`companyElement profile-${index} ${stock.symbol}`}>
                            <a href={`./company?symbol=${stock.symbol}`} title={stock.name} className={`${stock.symbol}`}>
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