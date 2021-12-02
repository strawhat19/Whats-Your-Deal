import React from 'react';
import "./sass/footer.css";
import "./css/customCSS.css";

function Footer() {
    const date = new Date();
    const year = date.getFullYear();
    return (
    <footer class="footer red">
        <div className={`innerFooter`}>
            <div class="nameText">
                <a class="customLink" href="https://strawhat19.github.io/Whats-Your-Deal/" target="_blank" title="GitHub Pages Deployment"><i class="fab fa-github"></i> | What's Your Deal</a>
            </div>
            <div class="siteText copyright">Copyright <i class="fas fa-copyright"></i> {year}</div>
        </div>
    </footer>
    );
}
 
export default Footer;