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
                        C# has been a dream language to learn. Visual Studio's environment makes working with this language effortless. Any problems with my code, I'm not only alerted to but most of the time am given steps to resolve or at least some clues to make debugging easier. I've been using C# commercially since 2020.
                    </p>
                </div>
            </div>
        </div>);
}

