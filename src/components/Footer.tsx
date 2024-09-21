import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(fas, fab);

export default function Footer() {
  return (
    <footer>
      <div id="social-footer">
        <a href="https://www.linkedin.com/in/jonathanrace1/" target="_blank">
          <FontAwesomeIcon icon={["fab", "linkedin"]} className="social-media-icons" />
        </a>
        <a href="https://www.hackerrank.com/racy1" target="_blank">
          <FontAwesomeIcon icon={["fab", "hackerrank"]} className="social-media-icons" />
        </a>
        <a href="https://codepen.io/jonathan-race" target="_blank">
          <FontAwesomeIcon icon={["fab", "codepen"]} className="social-media-icons" />
        </a>
        <a href="https://github.com/jonathanrace77" target="_blank">
          <FontAwesomeIcon icon={["fab", "github"]} className="social-media-icons" />
        </a>
      </div>
      <div id="copyright">
        <p>
          Jonathan Race <span>©2020</span>
        </p>
      </div>
    </footer>
  );
}
