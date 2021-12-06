import React from 'react';
import lottie from "lottie-web";
import stockAnimation from "../assets/animations/stockAnimation.json";
export default function MissionStatement() {
    React.useEffect(() => {
        lottie.loadAnimation({
            container: document.querySelector("#stockAnimation"),
            animationData: stockAnimation
        });
        }, []);

    return (
        <div className="sliderElem">
            <div className="sliderLeft">
                <h2>Mission Statement</h2>
                <p>Our Mission is to Provide our users with the latest information on Stocks from exchanges across the globe. Our extensive database of stock news, trends and prices will supply you with all the data you need to stay ahead of the curve in an ever-changing economy.</p>
            </div>
            <div className="sliderRight">
                <div className="stockAnimation" id="stockAnimation"></div>
            </div>
        </div>
    )
}
