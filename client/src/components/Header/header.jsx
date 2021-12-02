import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import "./sass/header.css";
import "./css/customCSS.css";

function Header() {
    
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

    return (
        <header className="header">
            <nav class="nav-menu navigation" id="navigation">
                <li class="nav-link Home"><a href="./" title="Home"><i class="fas fa-home"></i> What's Your Deal?!</a></li>
                <div class="social-links" id="socialLinksMain">
                    <div className="mainNavLink">
                        <a href="https://github.com/strawhat19/Whats-Your-Deal" class="nav-link githubLink" title="Github Repo" target="_blank"><i class="fab fa-github"></i></a>
                    </div>
                    <div className="mainNavLink">
                        <a href="/about" class="nav-link aboutLink" title="About Us"><i class="fas fa-user-edit"></i></a>
                    </div>
                </div>
                <div className={`registrationButtons`}>
                    <a href="Login" title="login"><i class="fas fa-sign-in-alt"></i> Login</a>
                    <a href="Register" title="Register"><i class="fas fa-user-plus"></i> Register</a>
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
                        <li class="nav-link About"><a href="/about"><i class="fas fa-user-edit"></i> About</a></li>
                        <li class="nav-link Github"><a href="https://github.com/strawhat19/Whats-Your-Deal"><i class="fab fa-github"></i> Github</a></li>
                        <li class="nav-link Home LoginNRegister"><a href="Login" title="Login"><i class="fas fa-sign-in-alt"></i> Login</a></li>
                        <li class="nav-link Home LoginNRegister"><a href="Register" title="Register"><i class="fas fa-user-plus"></i> Register</a></li>
                        <li class="nav-link Contact"><a href="/contact"><i class="fas fa-paper-plane"></i> Contact</a></li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}
 
export default Header;