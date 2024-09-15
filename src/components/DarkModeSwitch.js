import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(fas);

export default function DarkModeSwitch({ toggleDarkMode }) {
  return (
    <div id="darkModeSwitchContainer">
      <div id="darkModeSwitch" onTouchStart={toggleDarkMode} onMouseDown={toggleDarkMode}>
        <div id="darkModeSwitchCircle">
          <div id="darkModeSwitchSun">
            <FontAwesomeIcon icon={["fas", "sun"]} />
          </div>
          <div id="darkModeSwitchMoon">
            <FontAwesomeIcon icon={["fas", "moon"]} />
          </div>
        </div>
      </div>
    </div>
  );
}
