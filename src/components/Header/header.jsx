import React from 'react';
import "./sass/header.css";

function Header() {
    
    function openMobileMenu() {
        let mobileMenuOpen = document.getElementById("desktopMenu");
        let menuToggler = document.getElementById("openMenuToggler");
        mobileMenuOpen.classList.toggle("open-mobile-menu");
        menuToggler.classList.toggle("clicked");
    }

    return (
        <header className="header">
            <nav class="nav-menu" id="navigation">
                <li class="nav-link Home"><a href="./" title="Home"><i class="fas fa-home"></i> What's <span class="slashes">//</span> Your Deal?!</a></li>
                <div class="social-links" id="socialLinksMain">
                    <a href="https://strawhat19.github.io/Whats-Your-Deal/" class="nav-link instagramLink" title="Github Repo" target="_blank"><i class="fab fa-instagram"></i></a>
                    <a href="https://strawhat19.github.io/Whats-Your-Deal/" class="nav-link linkedInLink" title="Github Repo" target="_blank"><i class="fab fa-linkedin"></i></a>
                    <a href="mailto:rahmed@piratechs.com" class="nav-link emailLink" title="Email"  target="_blank"><i class="fas fa-envelope"></i></a>
                    <a href="https://strawhat19.github.io/Whats-Your-Deal/" class="nav-link piratechsLink" title="Github Repo" target="_blank"><i class="fas fa-share-alt-square"></i></a>
                    <a href="https://github.com/strawhat19/Whats-Your-Deal" class="nav-link githubLink" title="Github Repo" target="_blank"><i class="fab fa-github"></i></a>
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
                        <li class="nav-link About"><a href="#About">About <span class="slashes">//</span> <i class="fas fa-user-edit"></i></a></li>
                        <li class="nav-link resumeLink"><a href="#Resume">Resume <span class="slashes">//</span> <i class="fas fa-file"></i></a></li>
                        <li class="nav-link Projects"><a href="#Projects">Projects <span class="slashes">//</span> <i class="fas        fa-project-diagram"></i></a></li>
                        <li class="nav-link Contact"><a href="#Contact">Contact <span class="slashes">//</span> <i class="fas fa-paper-plane"></i></a></li>
                            <div class="social-links" id="socialLinks">
                                <a href="https://www.instagram.com/piratechsatl/" class="nav-link instagramLink" title="@Piratechsatl" target="_blank"><i class="fab fa-instagram"></i></a>
                                <a href="https://www.linkedin.com/in/rakib-ahmed19/" class="nav-link linkedInLink" title="LinkedIn" target="_blank"><i class="fab fa-linkedin"></i></a>
                                <a href="mailto:rahmed@piratechs.com" class="nav-link emailLink" title="Email"  target="_blank"><i class="fas fa-envelope"></i></a>
                                <a href="https://piratechs.com/" class="nav-link piratechsLink" title="Piratechs" target="_blank"><i class="fas fa-share-alt-square"></i></a>
                                <a href="https://github.com/strawhat19" class="nav-link githubLink" title="Github" target="_blank"><i class="fab fa-github"></i></a>
                            </div>
                    </ul>
                </div>
            </nav>
        </header>
    );
}
 
export default Header;