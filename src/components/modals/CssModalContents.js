import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { useRef } from "react";

library.add(fas, fab);

export default function CssModalContents() {
    const skillsTextSectionRef = useRef();

    return (
        <div id="css-container" className="skill-container">
            <div className="skills-text-col">
                <div className="skills-text-section gsap-section-fade-up" ref={skillsTextSectionRef}>
                    <p>
                        Most of my early work with CSS was using it to edit the styling of Wordpress sites for personal businesses I'd built (from around 2010). In 2019 I used FreeCodeCamp to learn about responsive design, Bootstrap and SaSS which I've found invaluable in projects I've worked on since. I've been using CSS and related frameworks / extensions commercially since 2020.
                    </p>
                </div>
            </div>
        </div>);
}

