import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";

library.add(fas, fab);

export default function HerbalCraftModalContents() {
    const portfolioTextSectionRef = useRef();

    var images = {
        skillsHtml: require("../../img/html5.png"),
        skillsCss: require("../../img/css3.png"),
        herbalCraftScreen: require("../../img/HerbalCraftScreen.jpg"),
        skillsJs: require("../../img/js.png"),
        skillsSketch: require("../../img/sketch.png"),
        skillsPhotoshop: require("../../img/photoshop.jpg")
    };

    return (
        <div id="herbal-craft-container" className="portfolio-container">
            <div className="portfolio-image-col gsap-section-fade-up">
                <img src={images.herbalCraftScreen} />
            </div>

            <div className="portfolio-gutter-col"></div>

            <div className="portfolio-text-col">
                <div className="portfolio-text-section gsap-section-fade-up" ref={portfolioTextSectionRef}>
                    <h3>Herbal Craft</h3>
                    <p>
                        Herbal Craft is a minecraft server; the website being used to offer online player count information using the MineTools API as well as linking to the store and discord.
                    </p>
                </div>
                <div className="portfolio-text-section gsap-section-fade-up" ref={portfolioTextSectionRef}>
                    <h3>Role</h3>
                    <p>
                        Web Developer / Designer - Building the project from initial concept designs, refining with input from the client, through to development and completion.
                    </p>
                </div>
                <div className="portfolio-text-section gsap-section-fade-up" ref={portfolioTextSectionRef}>
                    <h3>Main Skills</h3>
                    <div className="skills-container">
                        <div className="skills-container-col-1">
                            <div className="portfolio-skill"><img src={images.skillsHtml} className="portfolio-skill-img" /><p className="portfolio-skill-text">HTML</p></div>
                            <div className="portfolio-skill"><img src={images.skillsCss} className="portfolio-skill-img" /><p className="portfolio-skill-text">CSS</p></div>
                            <div className="portfolio-skill portfolio-skill-bottom portfolio-skill-bottom-col-1"><img src={images.skillsJs} className="portfolio-skill-img" /><p className="portfolio-skill-text">JS / jQuery</p></div>
                        </div>
                        <div className="skills-container-col-2">
                            <div className="portfolio-skill"><img src={images.skillsSketch} className="portfolio-skill-img" /><p className="portfolio-skill-text">Sketch</p></div>
                            <div className="portfolio-skill portfolio-skill-bottom"><img src={images.skillsPhotoshop} className="portfolio-skill-img" /><p className="portfolio-skill-text">Photoshop</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}

