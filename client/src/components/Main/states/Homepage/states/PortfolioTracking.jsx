import React from 'react';
import lottie from "lottie-web";
import stockAnimation3 from "../assets/animations/stockAnimation3.json";
export default function PortfolioTracking() {
    React.useEffect(() => {
        lottie.loadAnimation({
            container: document.querySelector("#stockAnimation3"),
            animationData: stockAnimation3
        });
        }, []);

    return (
        <div className="sliderElem">
            <div className="sliderLeft">
                <h2>Portfolio Tracking</h2>
                <p>Add & Update Stocks to your Portfolio for Easy Tracking.</p>
            </div>
            <div className="sliderRight">
                <div className="stockAnimation3" id="stockAnimation3"></div>
            </div>
        </div>
    )
}
