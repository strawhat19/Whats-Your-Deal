import React from 'react';
import lottie from "lottie-web";
import stockAnimation2 from "../assets/animations/stockAnimation2.json";
export default function AccessReal() {
    React.useEffect(() => {
        lottie.loadAnimation({
            container: document.querySelector("#stockAnimation2"),
            animationData: stockAnimation2,
            loop: false
        });
        }, []);

    return (
        <div className="sliderElem">
            <div className="sliderLeft">
                <h2>Access real-time market data.</h2>
                <p>Complimentary real-time data, customizable charts, and indicators.</p>
            </div>
            <div className="sliderRight">
                <div className="stockAnimation2" id="stockAnimation2"></div>
            </div>
        </div>
    )
}
