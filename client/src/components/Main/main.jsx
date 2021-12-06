import React from 'react';
import "./sass/main.css";
import "./css/customCSS.css";
import Company from './states/Company/company';
import Homepage from './states/Homepage/homepage';
import Login from '../Login/login';
import Register from '../Register/register';
import Dashboard from '../Dashboard/dashboard';

export default class Main extends React.Component {
    render(state) {
    state = this.props.state;

        const switchMain = (route) => {
            route = window.location.pathname.replace(`/`,``);
            

            switch(route) {
                case `Register`:
                    return <Register state={this.props.state} />;
                case `Login`:
                    return <Login state={this.props.state} />;
                case `company`:
                    return <Company state={this.props.state} />;
                case `dashboard`:
                    return <Dashboard state={this.props.state} />;
                default:
                    return <Homepage state={this.props.state} />; 
            }
        }


        return (
            <main class="main">
               {switchMain()}
            </main>
        );
    }
}