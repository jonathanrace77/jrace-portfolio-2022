import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { MutableRefObject, useRef } from "react";

library.add(fas, fab);

export default function DotNetModalContents() {
  const skillsTextSectionRef: MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);

  return (
    <div id="dot-net-container" className="skill-container">
      <div className="skills-text-col">
        <div className="skills-text-section gsap-section-fade-up" ref={skillsTextSectionRef}>
          <p>
            .NET is an incredibly versatile platform to work with. I've used it for desktop applications, web services (using ASP.NET) and even mobile
            applications (using Xamarin), I've worked with .NET framework and .NET Core commerically since 2020.
          </p>
        </div>
      </div>
    </div>
  );
}
