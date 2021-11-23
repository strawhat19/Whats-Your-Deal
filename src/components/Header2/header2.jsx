import React from 'react';
import "./sass/header2.css";

const Header2 = (props) => {
    const [isContainerActive, setIsContainerActive] = React.useState(false);
     const signUpButton = () => {
        setIsContainerActive(false);
     };  
     const signInButton = () => {
        setIsContainerActive(true);
     };
   
     return (
       <div className="header">
            <div id="container" className={`container${isContainerActive ? " right-panel-active" : ""}`}>
                <button className="ghost" id="signIn" onClick={signInButton}>Sign In</button>
                </div>
                <div className="overlay-panel overlay-right">
                <p>Enter your personal details and start journey with us</p>
                <button className="ghost" id="signUp" onClick={signUpButton}>Sign Up</button>
            </div>
       </div>
     );
   }
 
export default Header2;