import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { hideModal, setModalIsVisible } from "../site/modalSlice";

export default function OverlayActionButtons() {
  const dispatch = useAppDispatch();

  const keyPressed = useAppSelector((state) => state.inputReducer.keyPressed);
  const modalHead = useAppSelector((state) => state.modalReducer.modalHead);
  const modalIsVisible = useAppSelector((state) => state.modalReducer.modalIsVisible);
  const playerCanInteract = useAppSelector((state) => state.playerReducer.playerCanInteract);

  useEffect(() => {
    if (!keyPressed) return;

    //Handle user inputting 'a' or 'x' in contact form
    let contactModalLoaded = modalHead === "Contact" && modalIsVisible;

    if (keyPressed === "a" && !contactModalLoaded) handleAButtonPress();
    if (keyPressed === "x" && !contactModalLoaded) handleXButtonPress();
  }, [keyPressed]);

  const handleAButtonPress = () => {
    if (!playerCanInteract) return;
    dispatch(setModalIsVisible(true));
  };

  const handleXButtonPress = () => {
    dispatch(hideModal());
  };

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
