import React from 'react';
import "./sass/main.css";
import "./css/customCSS.css";
import Company from './states/Company/company';
import Homepage from './states/Homepage/homepage';
import Login from '../Login/login';
import Register from '../Register/register';

export default class Main extends React.Component {
    render(state) {
    state = this.props.state;

        const switchMain = (route) => {
            route = window.location.pathname.replace(`/`,``);

            switch(route) {
                case `Register`:
                    return <Register />;
                case `Login`:
                    return <Login />
                default:
                    return <div>Home Page</div>
            }
        }


        return (
            <main class="main">
               {switchMain()}
            </main>
        );
    }
}