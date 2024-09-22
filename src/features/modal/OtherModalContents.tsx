import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { MutableRefObject, useRef } from "react";

library.add(fas, fab);

export default function OtherModalContents() {
  const skillsTextSectionRef: MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);

  return (
    <div id="other-container" className="skill-container">
      <div className="skills-text-col">
        <div className="skills-text-section gsap-section-fade-up" ref={skillsTextSectionRef}>
          <h3>I also have experience with:</h3>
          <p>
            Angular, Azure, Bootstrap, D3 JS, ESLint, Express, GIT, GSAP, Illustrator, JEST, jQuery, MongoDB, Next JS, NgRx, Node JS, PHP, Redux, SQL, Svelte,
            Three JS, Vanta JS, Wordpress & Xamarin
          </p>
        </div>
      </div>
    </div>
  );
}
