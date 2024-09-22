import ContactModalContents from "../modal/ContactModalContents";
import DarkModeSwitch from "./DarkModeSwitch";
import React from "react";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModalContent } from "../../interfaces/modal-content.interface";

library.add(fas);

var images = {
  logo: require("../../img/logo_dark.png"),
  logoDark: require("../../img/logo_light.png"),
  pdf: require("../../img/pdf-logo.png"),
};

var cv = require("../../JonathanRaceCv.pdf");

export default function Header({
  updateModal,
  showModal,
  toggleDarkMode,
  themeIsDarkMode,
}: {
  updateModal: (modalContent: ModalContent) => void;
  showModal: () => void;
  toggleDarkMode: (event: Event) => void;
  themeIsDarkMode: boolean;
}) {
  const loadContactModal = () => {
    updateModal({ head: "Contact", body: <ContactModalContents /> });
    showModal();
  };

  return (
    <header id="header-container">
      <div className="logo-section">
        <div className="logo-container">
          <img alt="jonathan race logo" src={themeIsDarkMode ? images.logoDark : images.logo}></img>
        </div>
        <div className="logo-caption">
          FULL-STACK<br></br>DEVELOPER
        </div>
      </div>

      <nav>
        <div className="header-menu-container">
          <ul>
            {<DarkModeSwitch toggleDarkMode={toggleDarkMode} />}
            <li key="menu-border-right-portfolio">
              <a href={cv} target="_blank">
                <img src={images.pdf}></img>
              </a>
            </li>
            <li key="menu-border-right-contact">
              <div className="header-contact" onClick={loadContactModal}>
                <span id="contact-text">CONTACT</span>
                <span id="contact-icon">
                  <FontAwesomeIcon icon={["fas", "envelope"]} />
                </span>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
