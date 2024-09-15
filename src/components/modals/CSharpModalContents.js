import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { useRef } from "react";

library.add(fas, fab);

export default function CSharpModalContents() {
    const skillsTextSectionRef = useRef();

    return (
        <div id="c-sharp-container" className="skill-container">
            <div className="skills-text-col">
                <div className="skills-text-section gsap-section-fade-up" ref={skillsTextSectionRef}>
                    <p>
                        I appreciate C# being a strong typed language, detecting errors earlier, leading to faster development times. Having Linq queries for easier database querying and method overloading are other reasons why I love this language. I've been using C# commercially since 2020.
                    </p>
                </div>
            </div>
        </div>);
}

