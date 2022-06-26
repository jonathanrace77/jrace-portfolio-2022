import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { useRef } from "react";

library.add(fas, fab);

export default function OtherModalContents() {
    const skillsTextSectionRef = useRef();

    return (
        <div id="other-container" className="skill-container">
            <div className="skills-text-col">
                <div className="skills-text-section gsap-section-fade-up" ref={skillsTextSectionRef}>
                    <p>
                        I've also had fun working with the following technologies: Angular, Azure, Bootstrap, D3 JS, ESLint, Express, GIT, GSAP, Illustrator, JEST, jQuery, MongoDB, Next JS, Node JS, PHP, Redux, SQL, Svelte, Three JS, Vanta JS, Wordpress & Xamarin
                    </p>
                </div>
            </div>
        </div>);
}

