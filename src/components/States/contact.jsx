import React from 'react';
import ContentTitle from './contentTitle';

function Contact() { 
        return (
        <div id="contentLabel" data-label="contact" class="contentContainer contain contact">
            <ContentTitle />
            <div class="content">
                <div class="lineSep"></div>
                <h2 id="grabLabel" class="contactPage">Contact</h2>
                <p class="spacer">Get in touch with me.</p>
                <ul class="list-group">
                    <li class="list-item"><div class="html iconRow slashContainer"><i class="fab fa-html5"></i> <span class="slashes">//</span> HTML</div></li>
                    <li class="list-item"><div class="css iconRow slashContainer"><i class="fab fa-css3-alt"></i> <span class="slashes">//</span> CSS</div></li>
                    <li class="list-item"><div class="sass iconRow slashContainer"><i class="fab fa-sass"></i> <span class="slashes">//</span> SASS</div></li>
                    <li class="list-item"><div class="js iconRow slashContainer"><i class="fab fa-js-square"></i> <span class="slashes">//</span> JS</div></li>
                    <li class="list-item"><div class="node iconRow slashContainer"><i class="fab fa-node-js"></i> <span class="slashes">//</span> Node</div></li>
                    <li class="list-item"><div class="sql iconRow slashContainer"><i class="fas fa-database"></i> <span class="slashes">//</span> SQL</div></li>
                    <li class="list-item"><div class="mongo iconRow slashContainer"><i class="fas fa-server"></i> <span class="slashes">//</span> MongoDB</div></li>
                    <li class="list-item"><div class="react iconRow slashContainer"><i class="fab fa-react"></i> <span class="slashes">//</span> React</div></li>
                    <li class="list-item"><div class="swift iconRow slashContainer"><i class="fab fa-swift"></i> <span class="slashes">//</span> Swift</div></li>
                    <li class="list-item"><div class="git iconRow slashContainer"><i class="fab fa-git-alt"></i> <span class="slashes">//</span> Git</div></li>
                    <li class="list-item"><div class="unity iconRow slashContainer"><i class="fab fa-unity"></i> <span class="slashes">//</span> Unity</div></li>
                </ul>
                <button class="gameButton transition">Get in Touch</button>
            </div>
        </div>
        );
}
 
export default Contact;