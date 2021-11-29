import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import "./sass/stockbar.css";
import "./css/customCSS.css";

export default class Stockbar extends React.Component {
    render() {
        let plus = ``;
        let condition = ``;
        return (
            <div id="stockBar" className={`stockBar`}>
                {this.props.state.stocks.map((stock,index) => {

                    if (stock.changesP >= 0) {
                        condition = `positive`;
                        plus = `+`;
                    }  else {
                        condition = `negative`;
                    }

                    return (
                        <div key={`profile${index}`}  id={`${stock.symbol}`} className={`companyElement profile-${index} ${stock.symbol}`}>
                            <a href={stock.website} target="_blank" title={stock.name}>
                                <img className="companyIcon" src={stock.image} alt="Company Image"></img>
                                <span className={`companySymbol ${stock.symbol}`}>{stock.symbol}</span>
                                <span className={`companyChanges ${condition}`}>{plus} {stock.changesP.split(``).length > 7 ? stock.changesP.split(``).reverse().splice(4).reverse() : stock.changesP}</span>
                            </a>
                        </div>
                    )

                })}
            </div>
        )
    }
}