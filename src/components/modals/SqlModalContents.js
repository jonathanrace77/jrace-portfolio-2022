import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { useRef } from "react";

library.add(fas, fab);

export default function SqlModalContents() {
    const skillsTextSectionRef = useRef();

    return (
        <div id="sql-container" className="skill-container">
            <div className="skills-text-col">
                <div className="skills-text-section gsap-section-fade-up" ref={skillsTextSectionRef}>
                    <p>
                        Although I've worked with a few database management systems, I've found working with SQL to be one of the languages I'm most comfortable with. It is fast, easy to learn and widely used. I've been using SQL commercially since 2020.
                    </p>
                </div>
            </div>
        </div>);
}

