import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { hideModal, setModalHead, setModalIsVisible, setModalName } from "../site/modalSlice";
import SensoModalContents from "./SensoModalContents";
import ContactModalContents from "./ContactModalContents";
import HerbalCraftModalContents from "./HerbalCraftModalContents";
import BenMarshallModalContents from "./BenMarshallModalContents";
import FallingBlockGameModalContents from "./FallingBlockGameModalContents";
import HtmlModalContents from "./HtmlModalContents";
import CssModalContents from "./CssModalContents";
import JavascriptModalContents from "./JavascriptModalContents";
import ReactModalContents from "./ReactModalContents";
import DotNetModalContents from "./DotNetModalContents";
import CSharpModalContents from "./CSharpModalContents";
import SqlModalContents from "./SqlModalContents";
import OtherModalContents from "./OtherModalContents";
import IntroMessageModalContents from "./IntroMessageModalContents";

library.add(fas, fab);

export default function Modal() {
  const dispatch = useAppDispatch();

  const modalHead = useAppSelector((state) => state.modalReducer.modalHead);
  const modalIsVisible = useAppSelector((state) => state.modalReducer.modalIsVisible);
  const modalName = useAppSelector((state) => state.modalReducer.modalName);

  const components = new Map<string, React.JSX.Element>([
    ["BenMarshallModalContents", <BenMarshallModalContents />],
    ["ContactModalContents", <ContactModalContents />],
    ["CSharpModalContents", <CSharpModalContents />],
    ["CssModalContents", <CssModalContents />],
    ["DotNetModalContents", <DotNetModalContents />],
    ["FallingBlockGameModalContents", <FallingBlockGameModalContents />],
    ["HerbalCraftModalContents", <HerbalCraftModalContents />],
    ["HtmlModalContents", <HtmlModalContents />],
    ["IntroMessageModalContents", <IntroMessageModalContents />],
    ["JavascriptModalContents", <JavascriptModalContents />],
    ["OtherModalContents", <OtherModalContents />],
    ["ReactModalContents", <ReactModalContents />],
    ["SensoModalContents", <SensoModalContents />],
    ["SqlModalContents", <SqlModalContents />],
  ]);

  const el = useRef<HTMLInputElement>(null);
  const q = gsap.utils.selector(el);

  useEffect(() => {
    if (modalIsVisible) {
      gsap.fromTo(
        q(".gsap-section-fade-up"),
        {
          opacity: 0,
          y: "15px",
          stagger: 0.25,
        },
        {
          opacity: 1,
          y: "0px",
          stagger: 0.25,
        }
      );

      gsap.fromTo(
        q(".gsap-section-fade-left"),
        {
          opacity: 0,
          x: "15px",
          stagger: 1,
        },
        {
          opacity: 1,
          x: "0px",
          stagger: 1,
        }
      );
    }
  }, [modalIsVisible]);

  const modalStyle = {
    display: modalIsVisible ? "grid" : "none",
  };

  const closeModal = () => {
    dispatch(hideModal());
  };

  const introMessage = () => {
    if (localStorage.getItem("introMessageSeen") !== null) return;

    setTimeout(() => {
      dispatch(setModalHead("Welcome!"));
      dispatch(setModalName("IntroMessageModalContents"));
      dispatch(setModalIsVisible(true));

      localStorage.setItem("introMessageSeen", "true");
    }, 200);
  };

  useEffect(() => {
    document.body.classList.remove("body-intro");
    introMessage();
  }, []);

  return (
    <div id="modal-container" style={modalStyle}>
      <div id="modal" ref={el}>
        <div id="close-modal-container">
          <h2 id="modal-title" className="gsap-section-fade-left">
            {modalHead}
          </h2>
          <div id="close-modal">
            <FontAwesomeIcon icon={["fas", "xmark"]} onClick={closeModal} id="close-modal-button" />
          </div>
        </div>

        <div id="modal-body">{components.get(modalName)}</div>
      </div>
    </div>
  );
}
