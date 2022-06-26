import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { useRef } from "react";

library.add(fas, fab);

export default function DotNetModalContents() {
    const skillsTextSectionRef = useRef();

    return (
        <div id="dot-net-container" className="skill-container">
            <div className="skills-text-col">
                <div className="skills-text-section gsap-section-fade-up" ref={skillsTextSectionRef}>
                    <p>
                        My introducion to .Net was initially quite overwhelming but I've really grown to love just how versatile and powerful it can be. It seems that it can be used to create anything you can think of and now I'm struggling to imagine my full-stack workflow without it. I've been using .Net commercially since 2020.
                    </p>
                </div>
            </div>
        </div>);
}

