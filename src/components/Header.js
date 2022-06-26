import ContactModalContents from './modals/ContactModalContents.js'
import useState from 'react-usestateref';
import React from 'react';

var images = {
    logo: require("../img/logo_dark.png"),
    pdf: require("../img/pdf-logo.png"),
};

var cv = require("../JonathanRaceCv.pdf");

export default function Header({ updateModal, showModal, hideModal }) {
    const loadContactModal = () => {
        updateModal({head: "Contact", body: <ContactModalContents />});
        showModal();
    }

    return (
        <header id="header-container">
            <div className="logo-section">
                <div className="logo-container">
                    <img
                        alt="jonathan race logo"
                        src={images.logo}
                    ></img>
                </div>
                <div className="logo-caption">
                    FULL-STACK<br></br>DEVELOPER
                </div>
            </div>

            <nav>
                <div className="header-menu-container">
                    <ul>

                        <li key="menu-border-right-portfolio">
                            <a href={cv} target="_blank"><img src={images.pdf}></img></a>
                        </li>
                        <li key="menu-border-right-contact">
                            <div className="header-contact" onClick={loadContactModal}>
                                CONTACT
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>);
}