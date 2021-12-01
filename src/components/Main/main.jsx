import React from 'react';
import "./sass/main.css";
import "./css/customCSS.css";
import Company from './states/Company/company';
import Homepage from './states/Homepage/homepage';
import Login from '../Login/login'

export default class Main extends React.Component {
    render(state) {
        state = this.props.state;
        return (
            <main class="main">
                <Login />
            </main>
        );
    }
}