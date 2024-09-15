import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { useRef } from "react";

library.add(fas, fab);

export default function HtmlModalContents() {
    const skillsTextSectionRef = useRef();

    return (
        <div id="html-container" className="skill-container">
            <div className="skills-text-col">
                <div className="skills-text-section gsap-section-fade-up" ref={skillsTextSectionRef}>
                    <p>
                        My first brush with HTML was when I was around 10. I'd used it in side projects over the years but started getting more serious around 2019 when I took online courses to fill in my knowledge gaps and learnt more about semantic elements, accessibility and using JavaScript for DOM manipulation. I've been using HTML commercially since 2020.
                    </p>
                </div>
            </div>
        </div>);
}

