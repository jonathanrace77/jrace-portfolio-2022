import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

library.add(fas, fab);

export default function Modal({ modalContent, hideModal, modalIsVisible }) {
  const el = useRef();
  const q = gsap.utils.selector(el);

  useEffect(() => {
    if (!modalIsVisible.current) {
      gsap.to(q(".gsap-section-fade-up"), {
        opacity: 0,
        y: "15px",
        stagger: 0
      });

      gsap.to(q(".gsap-section-fade-left"), {
        opacity: 0,
        x: "15px",
        stagger: 0
      });
    } else {
      gsap.fromTo(q(".gsap-section-fade-up"), {
        opacity: 0,
        y: "15px",
        stagger: 0.25
      }, {
        opacity: 1,
        y: "0px",
        stagger: 0.25
      });

      gsap.fromTo(q(".gsap-section-fade-left"), {
        opacity: 0,
        x: "15px",
        stagger: 1
      }, {
        opacity: 1,
        x: "0px",
        stagger: 1
      });
    }
  }, [modalIsVisible.current]);

  let modalStyle = {
    display: modalIsVisible.current ? 'grid' : 'none'
  }

  const closeModal = () => {
    hideModal();
  }

  return (
    <div id="modal-container" style={modalStyle}>
      <div id="modal" ref={el}>
        <div id="close-modal-container">
          <h2 id="modal-title" className="gsap-section-fade-left">
            {modalContent.current && modalContent.current.head}
          </h2>
          <div id="close-modal"><FontAwesomeIcon icon={['fas', 'xmark']} onClick={closeModal} id="close-modal-button" /></div>
        </div>
        <div id="modal-body">
          {modalContent.current && modalContent.current.body}
        </div>
      </div>
    </div>);
}