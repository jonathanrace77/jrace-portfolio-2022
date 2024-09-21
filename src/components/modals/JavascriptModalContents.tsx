import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { MutableRefObject, useRef } from "react";

library.add(fas, fab);

export default function JavascriptModalContents() {
  const skillsTextSectionRef: MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);

  return (
    <div id="javascript-container" className="skill-container">
      <div className="skills-text-col">
        <div className="skills-text-section gsap-section-fade-up" ref={skillsTextSectionRef}>
          <p>
            Although my first attempts to learn JavaScript (around 2014) didn't result in much more than learning the basic syntax; once I learned about DOM
            manipulation (around 2019) I felt that "click", and I've been hooked since! Originally building my own web applications before moving onto freelance
            and using commercially since 2020.
          </p>
        </div>
      </div>
    </div>
  );
}
