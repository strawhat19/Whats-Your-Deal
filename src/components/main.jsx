import React, { useState } from 'react';
import Header from './Header/header';
import Homepage from './States/homepage';
import About from './States/about';
import Resume from './States/resume';
import Portfolio from './States/portfolio';
import Contact from './States/contact';
import Footer from './Footer/footer';
import Avatar from './Avatar/avatar';

function Main() { 

        const [currentState, setCurrentState] = useState('homePage');

        const handleState = () => {
            switch (currentState) {
                case 'homePage':
                    return <Homepage />;
                case 'aboutPage':
                    return <About />;
                case 'portfolioPage':
                    return <Portfolio />;
                case 'contactPage':
                    return <Contact />;
                case 'resumePage':
                    return <Resume />;
                default:
                    return <Homepage />;
            }
        }

        const changeCurrentState = (state) => setCurrentState(state);

        return (
        <main className="app">
            <div className="appMain">
                <Avatar />
                <Avatar />
                <Header currentState={currentState} changeCurrentState={changeCurrentState} />
                    {handleState()}
            </div>
        <Footer />
        </main>
        );
    }
 
export default Main;