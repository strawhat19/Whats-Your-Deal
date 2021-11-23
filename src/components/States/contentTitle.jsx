import React, {useState} from 'react';

function ContentTitle() {

    const [label, setLabel] = useState('homePage');

    const handleLabel = () => {

        switch (label) {
            default:
            case 'homePage':
                return (
                    <div class="homePage">
                        <h1 class="spacer homePage">
                            <i class="fab fa-react"></i> | React 
                            <span class="boldSecondary"> Portfolio</span>
                        </h1>
                    </div>
                );
            case 'aboutPage':
                return (
                    <div class="aboutPage">
                        <h1 class="spacer aboutPage">
                            <i class="fab fa-react"></i> | My 
                            <span class="boldSecondary"> Story</span>
                        </h1>
                    </div>
                );
            case 'portfolioPage':
                return (
                    <h1 class="spacer portfolioPage">
                        <i class="fab fa-react"></i> | My 
                        <span class="boldSecondary"> Apps</span>
                    </h1>
                );
            case 'contactPage':
                return (
                    <h1 class="spacer contactPage">
                        <i class="fab fa-react"></i> | Get In 
                        <span class="boldSecondary"> Touch</span>
                    </h1>
                );
            case 'resumePage':
                return (
                    <h1 class="spacer resumePage">
                        <i class="fab fa-react"></i> | My 
                        <span class="boldSecondary"> Resume</span>
                    </h1>
                );
            }
    }
        
    // const changeLabel = (label) => setLabel(label);

    const handleColorChange = (bodyBG) => {
        bodyBG = document.body.className;

        switch(bodyBG) {
            case 'developer':
                switchLight();
                break;
            case 'designer':
                switchDark();
                break;
        }

        function switchLight() {
            let animation = document.querySelector('#animation');
            let blacks = document.querySelectorAll('.black');
            let contentContainer = document.querySelector(`.contentContainer`);
            contentContainer.style.background = '#01154f';
            document.body.style.background = 'rgb(3, 62, 227)';
            document.body.classList.remove('developer');
            document.body.classList.add('designer');
            animation.classList.remove('dark');
            animation.classList.add('light');
            blacks.forEach(element => {
                element.style.background = '#01154f';
            })
        }

        function switchDark() {
            let animation = document.querySelector('#animation');
            let blacks = document.querySelectorAll('.black');
            let contentContainer = document.querySelector(`.contentContainer`);
            contentContainer.style.background = '#000';
            document.body.style.background = 'rgb(31, 52, 58)';
            document.body.classList.remove('designer');
            document.body.classList.add('developer');
            animation.classList.remove('light');
            animation.classList.add('dark');
            blacks.forEach(element => {
                element.style.background = '#000';
            })
        }
    }

    return (
        <div class="contentContainerTitle">
            {handleLabel()}
            <div class="iconContainer outerIconContainer">
                <a onClick={handleColorChange} class="showScoresLink" id="showScoresLink" title="Designer"><i class="fas fa-pencil-ruler"></i> | Designer</a>
                <a onClick={handleColorChange} class="showScoresLink" id="showScoresLink" title="Developer"><i class="fas fa-code"></i> | Developer</a>
            </div>
        </div>
    );
}
 
export default ContentTitle;