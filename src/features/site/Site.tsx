import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import useState from "react-usestateref";

import Modal from "../modal/Modal";
import Header from "./Header";
import App from "./App";
import Footer from "./Footer";
import { ModalContent } from "../../interfaces/modal-content.interface";
import React from "react";

library.add(fas, fab);

export default function Site() {
  const [modalIsVisible, setModalIsVisible, modalIsVisibleRef] = useState<boolean>(false);
  const [modalContent, setModalContent, modalContentRef] = useState<ModalContent>({ head: "", body: { type: "", props: "", key: "" } });
  const [modal, setModal] = useState<React.JSX.Element>(<Modal modalContent={React.createRef()} hideModal={() => {}} modalIsVisible={modalIsVisibleRef} />);
  const [themeIsDarkMode, setThemeIsDarkMode, themeIsDarkModeRef] = useState<boolean>(false);

  const isTouchDevice = (): boolean => {
    return navigator.maxTouchPoints > 0;
  };

  const updateModal = (modalContent: ModalContent): void => {
    setModalContent(modalContent);
  };

  const showModal = (): void => {
    setModalIsVisible(true);
    setModal(<Modal modalContent={modalContentRef} hideModal={hideModal} modalIsVisible={modalIsVisibleRef} />);
  };

  const hideModal = (): void => {
    setModalIsVisible(false);
    setModal(<Modal modalContent={React.createRef()} hideModal={hideModal} modalIsVisible={modalIsVisibleRef} />);
  };

  const toggleDarkMode = (event: Event): void => {
    // Avoid duplicate triggers from touch devices that also register mouse events
    if (event.type === "mousedown" && isTouchDevice()) return;

    setThemeIsDarkMode(!themeIsDarkMode);
    var body = document.getElementsByTagName("body")[0];
    body.setAttribute("data-dark-mode", themeIsDarkModeRef.current.toString());
  };

  return (
    <>
      {modal}
      <Header updateModal={updateModal} showModal={showModal} toggleDarkMode={toggleDarkMode} themeIsDarkMode={themeIsDarkMode} />
      <App
        updateModal={updateModal}
        showModal={showModal}
        hideModal={hideModal}
        modalIsVisible={modalIsVisibleRef}
        modalContent={modalContentRef}
        themeIsDarkMode={themeIsDarkMode}
        isTouchDevice={isTouchDevice}
      />
      <Footer />
    </>
  );
}
