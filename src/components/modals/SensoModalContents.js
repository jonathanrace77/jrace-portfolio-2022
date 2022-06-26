import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";

library.add(fas, fab);

export default function SensoModalContents() {
    const portfolioTextSectionRef = useRef();

    var images = {
        skillsDotNet: require("../../img/dotNet.png"),
        skillsCSharp: require("../../img/cSharp.png"),
        skillsAzure: require("../../img/azure.png"),
        sensoScreen: require("../../img/SensoScreen.jpg"),
        skillsJs: require("../../img/js.png"),
        skillsHtml: require("../../img/html5.png"),
        skillsSass: require("../../img/scss.png")
    };

    return (
        <div id="senso-container" className="portfolio-container">
            <div className="portfolio-image-col gsap-section-fade-up">
                <img src={images.sensoScreen} />
            </div>

            <div className="portfolio-gutter-col"></div>

            <div className="portfolio-text-col">
                <div className="portfolio-text-section gsap-section-fade-up" ref={portfolioTextSectionRef}>
                    <h3>Senso</h3>
                    <p>
                        Senso is a cloud-based device monitoring / safe-guarding platform supporting thousands of education establishments worldwide.
                    </p>
                </div>
                <div className="portfolio-text-section gsap-section-fade-up" ref={portfolioTextSectionRef}>
                    <h3>Role</h3>
                    <p>
                        Software Developer - Delivering features, improvements and bug fixes to the online single-page application and client application software.
                    </p>
                </div>
                <div className="portfolio-text-section gsap-section-fade-up" ref={portfolioTextSectionRef}>
                    <h3>Main Skills</h3>
                    <div className="skills-container">
                        <div className="skills-container-col-1">
                            <div className="portfolio-skill"><img src={images.skillsDotNet} className="portfolio-skill-img" /><p className="portfolio-skill-text">.NET</p></div>
                            <div className="portfolio-skill"><img src={images.skillsCSharp} className="portfolio-skill-img" /><p className="portfolio-skill-text">C#</p></div>
                            <div className="portfolio-skill portfolio-skill-bottom portfolio-skill-bottom-col-1"><img src={images.skillsAzure} className="portfolio-skill-img" /><p className="portfolio-skill-text">Azure</p></div>
                        </div>
                        <div className="skills-container-col-2">
                            <div className="portfolio-skill"><img src={images.skillsJs} className="portfolio-skill-img" /><p className="portfolio-skill-text">JS / jQuery</p></div>
                            <div className="portfolio-skill"><img src={images.skillsSass} className="portfolio-skill-img" /><p className="portfolio-skill-text">SaSS / CSS</p></div>
                            <div className="portfolio-skill portfolio-skill portfolio-skill-bottom"><img src={images.skillsHtml} className="portfolio-skill-img" /><p className="portfolio-skill-text">CSHTML</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}

