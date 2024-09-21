import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function OverlayActionButtons({ handleAButtonPress, handleXButtonPress }: { handleAButtonPress: () => void; handleXButtonPress: () => void }) {
  return (
    <div className="overlay-buttons-action">
      <div
        className="overlay-button overlay-buttons-a text-no-select"
        onContextMenu={(e) => e.preventDefault()}
        onTouchStart={handleAButtonPress}
        onClick={handleAButtonPress}
      >
        <FontAwesomeIcon icon={["fas", "a"]} className="overlay-button-icon text-no-select" />
      </div>
      <div
        className="overlay-button overlay-buttons-x text-no-select"
        onContextMenu={(e) => e.preventDefault()}
        onTouchStart={handleXButtonPress}
        onClick={handleXButtonPress}
      >
        <FontAwesomeIcon icon={["fas", "x"]} className="overlay-button-icon text-no-select" />
      </div>
    </div>
  );
}
