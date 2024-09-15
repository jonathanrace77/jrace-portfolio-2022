import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fas, fab);

export default function ContactModalContents() {
    return (
        <div id="contact-container">
            <div id="contact">
                <div id="contact-text" align="center">
                    <p className="gsap-section-fade-up">
                        Any questions before we <b>start</b>?
                    </p>
                </div>
                <div id="contact-form">
                    <form
                        action="https://usebasin.com/f/e981dacb641c"
                        method="POST"
                        id="form"
                        target="_blank"
                    >
                        <label htmlFor="name"></label>
                        <input
                            className="contact-form-text-area gsap-section-fade-up"
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Name"
                            required
                        ></input>
                        <br></br>
                        <label htmlFor="email-address"></label>
                        <input
                            className="contact-form-text-area gsap-section-fade-up"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            required
                        ></input>
                        <br></br>
                        <label htmlFor="message"></label>
                        <textarea
                            className="contact-form-text-area gsap-section-fade-up"
                            type="text"
                            id="message"
                            name="message"
                            placeholder="Message"
                            required
                        ></textarea>
                        <br></br>
                        <button type="submit" id="submit-button" className="gsap-section-fade-up">
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>);
}

