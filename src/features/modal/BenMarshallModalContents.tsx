import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { MutableRefObject, useRef } from "react";

library.add(fas, fab);

export default function BenMarshallModalContents() {
  const portfolioTextSectionRef: MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);

  var images = {
    skillsHtml: require("../../img/html5.png"),
    skillsSass: require("../../img/scss.png"),
    benMarshallScreen: require("../../img/BenMarshallScreen.jpg"),
    skillsJs: require("../../img/js.png"),
    skillsSketch: require("../../img/sketch.png"),
    skillsPhotoshop: require("../../img/photoshop.jpg"),
  };

  return (
    <div id="ben-marshall-container" className="portfolio-container">
      <div className="portfolio-image-col gsap-section-fade-up">
        <img src={images.benMarshallScreen} />
      </div>

      <div className="portfolio-gutter-col"></div>

      <div className="portfolio-text-col">
        <div className="portfolio-text-section gsap-section-fade-up" ref={portfolioTextSectionRef}>
          <h3>Ben Marshall Production</h3>
          <p>
            Ben Marshall Production is a music production studio based in the East Midlands. Although specialising in recording, the service also offers mixing
            and mastering.
          </p>
        </div>
        <div className="portfolio-text-section gsap-section-fade-up" ref={portfolioTextSectionRef}>
          <h3>Role</h3>
          <p>
            Web Developer / Designer - Offering multiple intitial concept designs, editing images and then development. I also offered webmaster help in
            updating and hosting the site.
          </p>
        </div>
        <div className="portfolio-text-section gsap-section-fade-up" ref={portfolioTextSectionRef}>
          <h3>Main Skills</h3>
          <div className="skills-container">
            <div className="skills-container-col-1">
              <div className="portfolio-skill">
                <img src={images.skillsHtml} className="portfolio-skill-img" />
                <p className="portfolio-skill-text">HTML</p>
              </div>
              <div className="portfolio-skill">
                <img src={images.skillsSass} className="portfolio-skill-img" />
                <p className="portfolio-skill-text">SaSS / CSS</p>
              </div>
              <div className="portfolio-skill portfolio-skill-bottom portfolio-skill-bottom-col-1">
                <img src={images.skillsJs} className="portfolio-skill-img" />
                <p className="portfolio-skill-text">JS / jQuery</p>
              </div>
            </div>
            <div className="skills-container-col-2">
              <div className="portfolio-skill">
                <img src={images.skillsSketch} className="portfolio-skill-img" />
                <p className="portfolio-skill-text">Sketch</p>
              </div>
              <div className="portfolio-skill portfolio-skill-bottom">
                <img src={images.skillsPhotoshop} className="portfolio-skill-img" />
                <p className="portfolio-skill-text">Photoshop</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
