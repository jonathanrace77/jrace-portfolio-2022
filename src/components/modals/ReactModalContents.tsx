import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { MutableRefObject, useRef } from "react";

library.add(fas, fab);

export default function ReactModalContents() {
  const skillsTextSectionRef: MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);

  return (
    <div id="react-container" className="skill-container">
      <div className="skills-text-col">
        <div className="skills-text-section gsap-section-fade-up" ref={skillsTextSectionRef}>
          <p>
            React is a library I can't help coming back to. After learning the basics in 2020, I've used it to build multiple projects (including this
            portfolio). I love using components for code reusability, state management for making UI updates easily and the introduction of React Hooks made
            everything just that bit more convenient.
          </p>
        </div>
      </div>
    </div>
  );
}
