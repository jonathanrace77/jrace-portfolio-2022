import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MutableRefObject, useRef } from "react";

library.add(fas, fab);

export default function IntroMessageModalContents() {
  const skillsTextSectionRef: MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);

  return (
    <div id="html-container" className="skill-container">
      <div className="skills-text-col">
        <div className="skills-text-section gsap-section-fade-up" ref={skillsTextSectionRef}>
          <h3>Welcome to Portfol-Isle!</h3>
          <p>
            Explore and interact using the on-screen buttons <FontAwesomeIcon className="introMessageIcon" icon={["fas", "arrow-pointer"]} /> or using a
            keyboard <FontAwesomeIcon className="introMessageIcon" icon={["fas", "keyboard"]} />
            <br></br>
            <br></br>
            To close this message, click the <FontAwesomeIcon className="introMessageIcon" icon={["fas", "xmark"]} /> in the top-right corner, the{" "}
            <FontAwesomeIcon className="introMessageIcon" icon={["fas", "square-xmark"]} /> button on your keyboard, or just click elsewhere on the screen.
          </p>
        </div>
      </div>
    </div>
  );
}
