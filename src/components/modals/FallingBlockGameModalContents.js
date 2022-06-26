import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import FallingBlockGame from '../../components/falling_block_game/FallingBlockGame.js'

library.add(fas, fab);

export default function FallingBlockGameModalContents() {
    const portfolioTextSectionRef = useRef();

    var images = {
        skillsReact: require("../../img/react.png"),
        skillsJs: require("../../img/js.png"),
        skillsHtml: require("../../img/html5.png"),
        skillsSass: require("../../img/scss.png")
    };

    return (
        <div id="falling-block-game-container" className="portfolio-container">
            <div className="portfolio-image-col gsap-section-fade-up">
                <FallingBlockGame />
            </div>

            <div className="portfolio-gutter-col"></div>

            <div className="portfolio-text-col">
                <div className="portfolio-text-section gsap-section-fade-up" ref={portfolioTextSectionRef}>
                    <h3>"Falling Block Game"</h3>
                    <p>
                        The classic "Falling Block Game" - Move and rotate the falling blocks to clear lines and rack up points before they build up and fill the board!
                    </p>
                </div>
                <div className="portfolio-text-section gsap-section-fade-up" ref={portfolioTextSectionRef}>
                    <h3>Role</h3>
                    <p>
                        React Developer - Main challenges were implementing game loops, collision detection and working with player input to create a fun user experience.
                    </p>
                </div>
                <div className="portfolio-text-section gsap-section-fade-up" ref={portfolioTextSectionRef}>
                    <h3>Main Skills</h3>
                    <div className="skills-container">
                        <div className="skills-container-col-1">
                            <div className="portfolio-skill"><img src={images.skillsReact} className="portfolio-skill-img" /><p className="portfolio-skill-text">React</p></div>
                            <div className="portfolio-skill"><img src={images.skillsJs} className="portfolio-skill-img" /><p className="portfolio-skill-text">JS</p></div>
                            <div className="portfolio-skill"><img src={images.skillsSass} className="portfolio-skill-img" /><p className="portfolio-skill-text">SaSS / CSS</p></div>
                        </div>
                        <div className="skills-container-col-2">
                            <div className="portfolio-skill portfolio-skill portfolio-skill-bottom"><img src={images.skillsHtml} className="portfolio-skill-img" /><p className="portfolio-skill-text">HTML</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}

