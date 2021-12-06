import React from 'react';
import lottie from "lottie-web";
import stockAnimation4 from "../assets/animations/stockAnimation4.json";
export default function LatestNews() {
    React.useEffect(() => {
        lottie.loadAnimation({
            container: document.querySelector("#stockAnimation4"),
            animationData: stockAnimation4
        });
        }, []);

    return (
        <div className="sliderElem">
            <div className="sliderLeft">
                <h2>Latest News</h2>
                <p>View the latest news and breaking news today for stocks and all things finance.</p>
            </div>
            <div className="sliderRight">
                <div className="stockAnimation4" id="stockAnimation4"></div>
            </div>
        </div>
    )
}
