import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect } from "react";
import { ArrowButton } from "../../interfaces/arrow-button.interface";
import { setKeyPressed, setKeyReleased, setKeysPressed } from "../island/inputSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { isTouchDevice } from "../../scripts/Utils";
import { _allowedInputKeys } from "../../scripts/Constants";

import { setPlayerIsMoving, setPlayerDirecton, setPlayerDirectionToMove } from "../island/playerSlice";
import DirectionEnum from "../../enums/Direction.enum";
import { hideModal } from "../site/modalSlice";

export default function OverlayArrowButtons({}: {}) {
  const dispatch = useAppDispatch();
  const keyPressed = useAppSelector((state) => state.inputReducer.keyPressed);
  const keyReleased = useAppSelector((state) => state.inputReducer.keyReleased);
  const keysPressed = useAppSelector((state) => state.inputReducer.keysPressed);

  const modalIsVisible = useAppSelector((state) => state.modalReducer.modalIsVisible);

  const arrowButtons: ArrowButton[] = [
    { className: "overlay-buttons-up", faIcon: "arrow-up", data: "ArrowUp" },
    { className: "overlay-buttons-right", faIcon: "arrow-right", data: "ArrowRight" },
    { className: "overlay-buttons-down", faIcon: "arrow-down", data: "ArrowDown" },
    { className: "overlay-buttons-left", faIcon: "arrow-left", data: "ArrowLeft" },
  ];

  const handleKeyPress = (event: Event | React.MouseEvent | React.KeyboardEvent): void => {
    let keyPressed = (event as React.KeyboardEvent).key;

    // Avoid duplicate triggers from touch devices that also register mouse events
    if (event.type === "mousedown" && isTouchDevice()) return;

    // User hovers over a button but isn't clicking
    if (event.type !== "keydown" && (event as React.MouseEvent).buttons < 1) return;

    // User is clicking a button
    if (event.type !== "keydown") {
      let element = (event?.target as HTMLElement)?.closest(`.overlay-button`);
      let dataset = (element as HTMLElement).dataset;

      if (dataset.overlayButton) keyPressed = dataset.overlayButton;
    }
    dispatch(setKeyPressed(keyPressed));
  };

  const handleKeyUp = (event: Event | React.MouseEvent | React.KeyboardEvent | null): void => {
    let keyReleased = (event as React.KeyboardEvent).key;

    if (event?.type !== "keyup") {
      let element = (event?.target as HTMLElement)?.closest(`.overlay-button`);
      let dataset = (element as HTMLElement).dataset;

      if (dataset.overlayButton) keyReleased = dataset.overlayButton;
    }

    dispatch(setKeyReleased(keyReleased));
  };

  useEffect(() => {
    if (!keyPressed) return;
    if (modalIsVisible) return;
    if (!_allowedInputKeys.includes(keyPressed)) return;

    let keysPressedUpdate = { ...keysPressed };
    let callPlayerMove = Object.values(keysPressed).every((key) => key === false);
    let playerDirectionToMoveLocal = null;

    switch (keyPressed) {
      case "ArrowRight":
        dispatch(setPlayerDirecton(DirectionEnum.east));
        playerDirectionToMoveLocal = DirectionEnum.east;
        keysPressedUpdate.east = true;
        break;
      case "ArrowDown":
        dispatch(setPlayerDirecton(DirectionEnum.south));
        playerDirectionToMoveLocal = DirectionEnum.south;
        keysPressedUpdate.south = true;
        break;
      case "ArrowLeft":
        dispatch(setPlayerDirecton(DirectionEnum.west));
        playerDirectionToMoveLocal = DirectionEnum.west;
        keysPressedUpdate.west = true;
        break;
      case "ArrowUp":
        dispatch(setPlayerDirecton(DirectionEnum.north));
        playerDirectionToMoveLocal = DirectionEnum.north;
        keysPressedUpdate.north = true;
        break;
    }

    dispatch(setPlayerDirectionToMove(playerDirectionToMoveLocal));

    if (callPlayerMove) dispatch(setPlayerIsMoving(true));

    dispatch(setKeysPressed(keysPressedUpdate));
  }, [keyPressed]);

  useEffect(() => {
    if (keyPressed) return;

    let keysPressedUpdate = { ...keysPressed };
    switch (keyReleased) {
      case "ArrowRight":
        keysPressedUpdate.east = false;
        break;
      case "ArrowDown":
        keysPressedUpdate.south = false;
        break;
      case "ArrowLeft":
        keysPressedUpdate.west = false;
        break;
      case "ArrowUp":
        keysPressedUpdate.north = false;
        break;
    }

    dispatch(setKeysPressed(keysPressedUpdate));

    var filtered = Object.keys(keysPressedUpdate).filter(function (key) {
      type keysPressedUpdateKey = keyof typeof keysPressedUpdate;
      return keysPressedUpdate[key as keysPressedUpdateKey];
    });

    type directonEnumKeyType = keyof typeof DirectionEnum;

    dispatch(setPlayerDirectionToMove(null));
    dispatch(setPlayerDirectionToMove(DirectionEnum[filtered.toString() as directonEnumKeyType]));

    const playerHasStopped = filtered.length < 1;
    dispatch(setPlayerIsMoving(!playerHasStopped));

    if (DirectionEnum[filtered.toString() as directonEnumKeyType] !== undefined) {
      dispatch(setPlayerDirecton(DirectionEnum[filtered.toString() as directonEnumKeyType]));
    }
  }, [keyReleased, keyPressed]);

  const handleDocumentMouseDown = useCallback((event: MouseEvent | TouchEvent) => {
    if (modalIsVisible && (event.target as HTMLElement).closest("#modal") === null) dispatch(hideModal());
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("mousedown", handleDocumentMouseDown);
    document.addEventListener("touchstart", handleDocumentMouseDown);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("mousedown", handleDocumentMouseDown);
      document.removeEventListener("touchstart", handleDocumentMouseDown);
    };
  }, []);

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
