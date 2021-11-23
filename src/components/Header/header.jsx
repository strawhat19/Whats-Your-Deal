import React from 'react';
import Navigation from './navigation';
import Title from './title';
import "./style/header.css";

function Header({ currentState, changeCurrentState }) {
    return  (
    <header class="slantNav">
        <Title />
        <Navigation currentState={currentState} changeCurrentState={changeCurrentState} />
    </header>
    );
}
 
export default Header;