import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import "./sass/header.css";
import "./css/customCSS.css";
import userContext from '../../contexts/loginContext';

function Header() {

    const user = useContext(userContext);
    
    const openMobileMenu = (identifier) =>  {
        let mobileMenuOpen = $("#desktopMenu");
        let menuToggler = $("#openMenuToggler");
        let mobileMenuJS = document.getElementById(`desktopMenu`);

        mobileMenuOpen.toggleClass("open-mobile-menu");
        menuToggler.toggleClass("clicked");

        identifier = mobileMenuJS.classList[2];

        switch (identifier) {
            case `null`:
            case `undefined`:
            default:
                mobileMenuOpen.toggleClass(`closed`);
                break;
            case `open-mobile-menu`:
                break;
        }
    }

    const logoutUser = () => {
        localStorage.removeItem(`Current User`);
        window.location.href = "/";
    }

    const renderLogin = () => {
        if (user) {
            return <a class="logoutButton" onClick={logoutUser} title="logout"><i class="fas fa-sign-out-alt"></i> Logout</a>
        } else {
            return (
            <>
                <a href="Login" title="login"><i class="fas fa-sign-in-alt"></i> Login</a>
                <a href="Register" title="Register"><i class="fas fa-user-plus"></i> Register</a>
            </>
            )
        }
    }

    const renderUsername = () => {
        if (user) {
            return (
                <>
                <div className="mainNavLink">
                    <a href="/dashboard" class="nav-link dashboardLink" title="Dashboard"><i class="fas fa-house-user"></i></a>
                </div>
                <div className="mainNavLink">
                    - Welcome, {user.user.name}
                </div>
                </>
            )
        } else {
            return <div className="mainNavLink">- Welcome, Please Log in or Register to customize stock</div>;
        }
    }

    const renderMobileLogin = () => {
        if (user) {
            return (
                <>
                    <li class="nav-link Home LogoutRegister"><a onClick={logoutUser} title="Logout"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
                </>
            )
        } else {
            return (
                <>
                    <li class="nav-link Home LoginNRegister"><a href="Login" title="Login"><i class="fas fa-sign-in-alt"></i> Login</a></li>
                    <li class="nav-link Home LoginNRegister"><a href="Register" title="Register"><i class="fas fa-user-plus"></i> Register</a></li>
                </>
            )
        }
    }

    return (
        <header className="header">
            <nav class="nav-menu navigation" id="navigation">
                <li class="nav-link Home"><a href="./" title="Home"><i class="fas fa-home"></i> What's Your Deal?!</a></li>
                <div class="social-links" id="socialLinksMain">
                    <div className="mainNavLink">
                        <a href="https://github.com/strawhat19/Whats-Your-Deal" class="nav-link githubLink" title="Github Repo" target="_blank"><i class="fab fa-github"></i></a>
                    </div>
                    {renderUsername()}
                </div>
                <div className={`registrationButtons`}>
                    {renderLogin()}
                </div>
                <div class="mobile-menu-option" id="mobile-menu-option">
                    <div id="menuToggle" onClick={openMobileMenu}>
                        <a id="openMenuToggler" class="openMenuToggler">
                            <span id="menuTogglerSpan" class="menuTogglerSpan"></span>
                            <span id="menuTogglerSpan" class="menuTogglerSpan"></span>
                            <span id="menuTogglerSpan" class="menuTogglerSpan"></span>
                        </a>
                    </div>
                    <ul class="desktop-menu-option mobile-Menu" id="desktopMenu">
                        <li class="nav-link Github"><a href="https://github.com/strawhat19/Whats-Your-Deal"><i class="fab fa-github"></i> Github</a></li>
                        {renderMobileLogin()}
                    </ul>
                </div>
            </nav>
        </header>
    );
}
 
export default Header;