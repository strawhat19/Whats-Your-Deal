import React from "react";

function Navigation({currentState, changeCurrentState}, classes) {

    classes = `black ${currentState}`;

    function homeState() {
        changeCurrentState('homePage');
        // changeLabel('homePage');
    }
    function aboutState() {
        changeCurrentState('aboutPage');
        // changeLabel('aboutPage');
    }
    function portfolioState() {
        changeCurrentState('portfolioPage');
        // changeLabel('portfolioPage');
    }
    function contactState() {
        changeCurrentState('contactPage');
        // changeLabel('contactPage');
    }
    function resumeState() {
        changeCurrentState('resumePage');
        // changeLabel('resumePage');
    }

    return (
    <nav className={classes} id={currentState}>
        <a onClick={() => homeState()} class="home homeLink hoverLine" id="homePage" title="Home"><i class="fas fa-home home"></i> | Home</a>
        <a onClick={() => aboutState()} class="navLink hoverLine" id="aboutPage" title="About"><i class="fas fa-address-card"></i> | About</a>
        <a onClick={() => portfolioState()} class="navLink hoverLine" id="portfolioPage" title="Portfolio"><i class="fas fa-project-diagram"></i> | Portfolio</a>
        <a onClick={() => contactState()} class="navLink hoverLine" id="contactPage" title="Contact"><i class="fas fa-paper-plane"></i> | Contact</a>
        <a onClick={() => resumeState()} class="navLink hoverLine" id="resumePage" title="Resume"><i class="fas fa-file-contract"></i> | Resume</a>
    </nav>
    );
}
 
export default Navigation;