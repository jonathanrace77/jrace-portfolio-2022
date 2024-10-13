import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import useState from "react-usestateref";
import Modal from "../modal/Modal";
import Header from "./Header";
import App from "./App";
import Footer from "./Footer";
import React from "react";
import { isTouchDevice } from "../../scripts/Utils";

library.add(fas, fab);

export default function Site() {
  const [themeIsDarkMode, setThemeIsDarkMode, themeIsDarkModeRef] = useState<boolean>(false);

  const toggleDarkMode = (event: Event): void => {
    // Avoid duplicate triggers from touch devices that also register mouse events
    if (event.type === "mousedown" && isTouchDevice()) return;

    setThemeIsDarkMode(!themeIsDarkMode);
    var body = document.getElementsByTagName("body")[0];
    body.setAttribute("data-dark-mode", themeIsDarkModeRef.current.toString());
  };

  return (
    <>
      <Modal />
      <Header toggleDarkMode={toggleDarkMode} themeIsDarkMode={themeIsDarkMode} />
      <App themeIsDarkMode={themeIsDarkMode} />
      <Footer />
    </>
  );
}
