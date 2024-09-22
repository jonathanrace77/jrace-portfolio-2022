import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArrowButton } from "../../interfaces/arrow-button.interface";

export default function OverlayArrowButtons({
  handleKeyPress,
  handleKeyUp,
}: {
  handleKeyPress: (event: Event | React.MouseEvent | React.KeyboardEvent) => void;
  handleKeyUp: (event: Event | React.MouseEvent | React.KeyboardEvent) => void;
}) {
  const arrowButtons: ArrowButton[] = [
    { className: "overlay-buttons-up", faIcon: "arrow-up", data: "ArrowUp" },
    { className: "overlay-buttons-right", faIcon: "arrow-right", data: "ArrowRight" },
    { className: "overlay-buttons-down", faIcon: "arrow-down", data: "ArrowDown" },
    { className: "overlay-buttons-left", faIcon: "arrow-left", data: "ArrowLeft" },
  ];

  return (
    <div className="overlay-buttons-arrows">
      {arrowButtons.map((a, index) => {
        let buttonClassName = `overlay-button text-no-select ${a.className}`;

        return (
          <div
            className={buttonClassName}
            data-overlay-button={a.data}
            onContextMenu={(e) => e.preventDefault()}
            onTouchStart={handleKeyPress as () => void}
            onTouchEnd={handleKeyUp as () => void}
            onMouseDown={handleKeyPress}
            onMouseOver={handleKeyPress}
            onMouseLeave={handleKeyUp}
            onMouseUp={handleKeyUp}
            key={index}
          >
            <FontAwesomeIcon icon={["fas", a.faIcon]} className="overlay-button-icon text-no-select" data-overlay-button={a.data} />
          </div>
        );
      })}
    </div>
  );
}
