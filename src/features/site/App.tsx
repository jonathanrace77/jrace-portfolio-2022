// #region Import Region
// Import React
import React, { MutableRefObject, RefObject, useCallback, useEffect, useRef } from "react";
import useState from "react-usestateref";

// Import Maps
import { overWorldMap } from "../../maps/overworldMap.js";
import { skillsMap } from "../../maps/skillsMap.js";
import { portfolioMap } from "../../maps/portfolioMap.js";
import { homeMap } from "../../maps/homeMap.js";

// Import Game Logic
import CollisionLevel from "../../enums/CollisionLevel.enum";
import DirectionEnum from "../../enums/Direction.enum";
import Map from "../../enums/Map.enum";
import tileCollisionLevels from "../../scripts/TileCollisionLevels.js";

// Import Modals
import SensoModalContents from "../modal/SensoModalContents";
import HerbalCraftModalContents from "../modal/HerbalCraftModalContents";
import BenMarshallModalContents from "../modal/BenMarshallModalContents";
import FallingBlockGameModalContents from "../modal/FallingBlockGameModalContents";
import HtmlModalContents from "../modal/HtmlModalContents";
import CssModalContents from "../modal/CssModalContents";
import JavascriptModalContents from "../modal/JavascriptModalContents";
import ReactModalContents from "../modal/ReactModalContents";
import DotNetModalContents from "../modal/DotNetModalContents";
import CSharpModalContents from "../modal/CSharpModalContents";
import SqlModalContents from "../modal/SqlModalContents";
import OtherModalContents from "../modal/OtherModalContents";
import IntroMessageModalContents from "../modal/IntroMessageModalContents";

// Import Styles
import "./App.css";

import { gsap } from "gsap";

// Import Components
import OverlayActionButtons from "../island/OverlayActionButtons";
import OverlayArrowButtons from "../island/OverlayArrowButtons";
import Player from "../island/Player";
import Skills from "../island/Skills";
import RubberDuck from "../island/RubberDuck";
import Windmill from "../island/Windmill";
import WorldMap from "../island/WorldMap";
import { ModalContent } from "../../interfaces/modal-content.interface.js";

// Store
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setPlayerIsMoving, setPlayerDirecton, setPlayerCanInteract, setShowPlayerAnimationFrame } from "../island/playerSlice";

// #endregion

function App({
  updateModal,
  showModal,
  hideModal,
  modalIsVisible,
  modalContent,
  themeIsDarkMode,
  isTouchDevice,
}: {
  updateModal: (arg0: ModalContent) => void;
  showModal: () => void;
  hideModal: () => void;
  modalIsVisible: RefObject<boolean>;
  modalContent: RefObject<ModalContent>;
  themeIsDarkMode: boolean;
  isTouchDevice: () => boolean;
}) {
  const _tileWidth = 64;
  const _tileHeight = 64;

  const _allowedInputKeys = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"];
  let _playerMoveTimeout: MutableRefObject<ReturnType<typeof setTimeout> | undefined> = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  let _playerAnimationTimeout: MutableRefObject<ReturnType<typeof setTimeout> | undefined> = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const [tileMap, setTileMap, tileMapRef] = useState<number[][][]>(overWorldMap);
  const [mapSizeByTile, setMapSizeByTile] = useState<number[]>([37, 25]);
  const [mapPosition, setMapPosition] = useState<number[]>([0, 0]);

  const [keysPressed, setKeysPressed] = useState({
    north: false,
    east: false,
    south: false,
    west: false,
  });
  const [playerPosition, setPlayerPosition, playerPositionRef] = useState<number[]>([18, 12]);
  const [playerDirectionToMove, setPlayerDirectionToMove, playerDirectionToMoveRef] = useState<number | null>(null);

  // Store
  const dispatch = useAppDispatch();
  const playerCanInteract = useAppSelector((state) => state.playerReducer.playerCanInteract);
  const playerIsMoving = useAppSelector((state) => state.playerReducer.playerIsMoving);
  const playerDirection = useAppSelector((state) => state.playerReducer.playerDirection);

  const transitionRef: MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);

  const [modalContents, setModalContents, modalContentsRef] = useState<ModalContent>({ head: "", body: { type: "", props: "", key: "" } });

  const playerMove = (playerDirectionToMoveLocal: number | null = null) => {
    if (!playerIsMoving) return;

    if (playerDirectionToMoveLocal === null) playerDirectionToMoveLocal = playerDirectionToMoveRef.current;

    dispatch(setShowPlayerAnimationFrame(true));

    switch (playerDirectionToMoveLocal) {
      case DirectionEnum.east:
        let playerCanMoveEast =
          tileCollisionLevels[tileMapRef.current[playerPositionRef.current[1]][playerPositionRef.current[0] + 1] as keyof typeof tileCollisionLevels] !==
          CollisionLevel.block;

        if (!playerCanMoveEast) break;

        setPlayerPosition((playerPosition) => [playerPositionRef.current[0] + 1, playerPositionRef.current[1]]);
        setMapPosition((mapPosition) => [mapPosition[0] - _tileWidth, mapPosition[1]]);
        break;
      case DirectionEnum.south:
        let playerCanMoveSouth =
          tileCollisionLevels[tileMapRef.current[playerPositionRef.current[1] + 1][playerPositionRef.current[0]] as keyof typeof tileCollisionLevels] !==
          CollisionLevel.block;
        if (!playerCanMoveSouth) break;

        setPlayerPosition((playerPosition) => [playerPositionRef.current[0], playerPositionRef.current[1] + 1]);
        setMapPosition((mapPosition) => [mapPosition[0], mapPosition[1] - _tileHeight]);
        break;
      case DirectionEnum.west:
        let playerCanMoveWest =
          tileCollisionLevels[tileMapRef.current[playerPositionRef.current[1]][playerPositionRef.current[0] - 1] as keyof typeof tileCollisionLevels] !==
          CollisionLevel.block;
        if (!playerCanMoveWest) break;

        setPlayerPosition((playerPosition) => [playerPositionRef.current[0] - 1, playerPositionRef.current[1]]);
        setMapPosition((mapPosition) => [mapPosition[0] + _tileWidth, mapPosition[1]]);
        break;
      case DirectionEnum.north:
        let playerCanMoveNorth =
          tileCollisionLevels[tileMapRef.current[playerPositionRef.current[1] - 1][playerPositionRef.current[0]] as keyof typeof tileCollisionLevels] !==
          CollisionLevel.block;
        if (!playerCanMoveNorth) break;

        setPlayerPosition((playerPosition) => [playerPositionRef.current[0], playerPositionRef.current[1] - 1]);
        setMapPosition((mapPosition) => [mapPosition[0], mapPosition[1] + _tileHeight]);
        break;
    }

    let tile = tileMapRef.current[playerPositionRef.current[1]][playerPositionRef.current[0]];

    warpTileLand(tile[0]);
    interactTileLand(tile[0]);

    _playerAnimationTimeout.current = setTimeout((current: any) => {
      dispatch(setShowPlayerAnimationFrame(false));
    }, 50);

    _playerMoveTimeout.current = setTimeout(() => {
      if (playerIsMoving) playerMove(null);
    }, 100);
  };

  const warpTileLand = (tile: number) => {
    const warpTiles = [608, 726, 829, 929];

    if (!warpTiles.includes(tile)) return;

    const playerPosition = playerPositionRef.current;
    const skillsEntrance = [18, 7].toString();
    const skillsExit = [2, 13].toString();
    const portfolioEntrance = [23, 14].toString();
    const portfolioExit = [2, 6].toString();
    const homeEntrance = [7, 11].toString();
    const homeExit = [2, 8].toString();

    switch (playerPosition.toString()) {
      case skillsEntrance:
        loadMap(Map.skills);
        break;
      case portfolioEntrance:
        loadMap(Map.portfolio);
        break;
      case homeEntrance:
        loadMap(Map.home);
        break;
      case skillsExit:
        loadMap(Map.worldFromSkills);
        break;
      case portfolioExit:
        loadMap(Map.worldFromPortfolio);
        break;
      case homeExit:
        loadMap(Map.worldFromHome);
        break;
    }
  };

  const interactTileLand = (tile: number) => {
    const interactTiles = [714, 827, 920];

    dispatch(setPlayerCanInteract(false));

    if (!interactTiles.includes(tile)) return;

    switch (tile) {
      case 714:
        handleSkillsInteract();
        break;
      case 827:
        handlePortfolioInteract();
        break;
      case 920:
        handleHomeInteract();
        break;
    }
  };

  const handleSkillsInteract = () => {
    const playerPosition = playerPositionRef.current;
    const htmlInteractTiles = [[2, 7].toString(), [3, 7].toString()];
    const cssInteractTiles = [[5, 7].toString(), [6, 7].toString()];
    const javascriptInteractTiles = [[8, 7].toString(), [9, 7].toString()];
    const reactInteractTiles = [[11, 7].toString(), [12, 7].toString()];
    const dotNetInteractTiles = [[2, 11].toString(), [3, 11].toString()];
    const cSharpInteractTiles = [[5, 11].toString(), [6, 11].toString()];
    const sqlInteractTiles = [[8, 11].toString(), [9, 11].toString()];
    const otherInteractTiles = [[11, 11].toString(), [12, 11].toString()];

    if (htmlInteractTiles.includes(playerPosition.toString()) && playerDirection === DirectionEnum.north) {
      dispatch(setPlayerCanInteract(true));
      setModalContents({ head: "HTML", body: <HtmlModalContents /> });
    }

    if (cssInteractTiles.includes(playerPosition.toString()) && playerDirection === DirectionEnum.north) {
      dispatch(setPlayerCanInteract(true));
      setModalContents({ head: "CSS", body: <CssModalContents /> });
    }

    if (javascriptInteractTiles.includes(playerPosition.toString()) && playerDirection === DirectionEnum.north) {
      dispatch(setPlayerCanInteract(true));
      setModalContents({
        head: "JAVASCRIPT",
        body: <JavascriptModalContents />,
      });
    }

    if (reactInteractTiles.includes(playerPosition.toString()) && playerDirection === DirectionEnum.north) {
      dispatch(setPlayerCanInteract(true));
      setModalContents({ head: "REACT", body: <ReactModalContents /> });
    }

    if (dotNetInteractTiles.includes(playerPosition.toString()) && playerDirection === DirectionEnum.north) {
      dispatch(setPlayerCanInteract(true));
      setModalContents({ head: ".NET", body: <DotNetModalContents /> });
    }

    if (cSharpInteractTiles.includes(playerPosition.toString()) && playerDirection === DirectionEnum.north) {
      dispatch(setPlayerCanInteract(true));
      setModalContents({ head: "C#", body: <CSharpModalContents /> });
    }

    if (sqlInteractTiles.includes(playerPosition.toString()) && playerDirection === DirectionEnum.north) {
      dispatch(setPlayerCanInteract(true));
      setModalContents({ head: "SQL", body: <SqlModalContents /> });
    }

    if (otherInteractTiles.includes(playerPosition.toString()) && playerDirection === DirectionEnum.north) {
      dispatch(setPlayerCanInteract(true));
      setModalContents({ head: "OTHER", body: <OtherModalContents /> });
    }
  };

  const handlePortfolioInteract = () => {
    const playerPosition = playerPositionRef.current;
    const sensoInteractTiles = [[3, 4].toString(), [4, 4].toString(), [5, 4].toString()];
    const herbalCraftInteractTiles = [[7, 4].toString(), [8, 4].toString(), [9, 4].toString(), [10, 4].toString()];
    const benMarshallInteractTiles = [[12, 4].toString(), [13, 4].toString()];

    if (sensoInteractTiles.includes(playerPosition.toString()) && playerDirection === DirectionEnum.north) {
      dispatch(setPlayerCanInteract(true));
      setModalContents({ head: "SENSO", body: <SensoModalContents /> });
    }

    if (herbalCraftInteractTiles.includes(playerPosition.toString()) && playerDirection === DirectionEnum.north) {
      dispatch(setPlayerCanInteract(true));
      setModalContents({
        head: "HERBAL CRAFT",
        body: <HerbalCraftModalContents />,
      });
    }

    if (benMarshallInteractTiles.includes(playerPosition.toString()) && playerDirection === DirectionEnum.north) {
      dispatch(setPlayerCanInteract(true));
      setModalContents({
        head: "BEN MARSHALL PRODUCTION",
        body: <BenMarshallModalContents />,
      });
    }
  };

  const handleHomeInteract = () => {
    const playerPosition = playerPositionRef.current;
    const videoGameTiles = [[3, 4].toString(), [4, 4].toString(), [5, 4].toString()];

    if (videoGameTiles.includes(playerPosition.toString()) && playerDirection === DirectionEnum.north) {
      dispatch(setPlayerCanInteract(true));
      setModalContents({
        head: '"Falling Block Game"',
        body: <FallingBlockGameModalContents />,
      });
    }
  };

  const loadMap = (mapToLoad: number) => {
    triggerTransitionAnimation();

    switch (mapToLoad) {
      case Map.worldFromSkills:
        setMapSizeByTile([37, 25]);
        setTileMap(overWorldMap);
        setPlayerPosition([18, 8]);
        setMapPosition([_tileWidth * 0, _tileHeight * 4]);
        setPlayerInside(false);
        break;
      case Map.skills:
        setMapSizeByTile([15, 15]);
        setTileMap(skillsMap);
        setPlayerPosition([2, 12]);
        setMapPosition([_tileWidth * 5, _tileHeight * -5]);
        setPlayerInside(true);
        break;
      case Map.worldFromPortfolio:
        setMapSizeByTile([37, 25]);
        setTileMap(overWorldMap);
        setPlayerPosition([23, 15]);
        setMapPosition([_tileWidth * -5, _tileHeight * -3]);
        setPlayerInside(false);
        break;
      case Map.portfolio:
        setMapSizeByTile([17, 7]);
        setTileMap(portfolioMap);
        setPlayerPosition([2, 5]);
        setMapPosition([_tileWidth * 6, _tileHeight * -2]);
        setPlayerInside(true);
        break;
      case Map.worldFromHome:
        setMapSizeByTile([37, 25]);
        setTileMap(overWorldMap);
        setPlayerPosition([7, 12]);
        setMapPosition([_tileWidth * 11, _tileHeight * 0]);
        setPlayerInside(false);
        break;
      case Map.home:
        setMapSizeByTile([11, 9]);
        setTileMap(homeMap);
        setPlayerPosition([2, 7]);
        setMapPosition([_tileWidth * 3, _tileHeight * -3]);
        setPlayerInside(true);
        break;
    }
  };

  const setPlayerInside = (playerIsInside: boolean) => {
    var body = document.getElementsByTagName("body")[0];
    body.setAttribute("data-player-inside", playerIsInside.toString());
  };

  const triggerTransitionAnimation = () => {
    gsap.fromTo(
      [transitionRef.current],
      {
        opacity: 1,
        duration: 0,
      },
      {
        opacity: 0,
        duration: 1.0,
        ease: "steps(8)",
      }
    );
  };

  const handleKeyPress = useCallback(
    (event: Event | React.MouseEvent | React.KeyboardEvent) => {
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

      // Handle user inputting 'a' or 'x' in contact form
      let contactModalLoaded = modalContent.current?.head === "Contact" && modalIsVisible.current;

      if (keyPressed === "a" && !contactModalLoaded) {
        handleAButtonPress();
      }

      if (keyPressed === "x" && !contactModalLoaded) {
        handleXButtonPress();
      }

      if (modalIsVisible.current) return;

      if (!_allowedInputKeys.includes(keyPressed)) return;

      let keysPressedUpdate = keysPressed;
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

      setPlayerDirectionToMove(playerDirectionToMoveLocal);

      if (callPlayerMove) dispatch(setPlayerIsMoving(true));

      setKeysPressed(keysPressedUpdate);
    },
    [mapPosition, playerDirectionToMove, playerIsMoving]
  );

  const handleAButtonPress = () => {
    if (!playerCanInteract) return;

    updateModal(modalContents);
    showModal();
  };

  const handleXButtonPress = () => {
    hideModal();
  };

  const handleKeyUp = useCallback(
    (event: Event | React.MouseEvent | React.KeyboardEvent) => {
      let keyReleased = (event as React.KeyboardEvent).key;

      if (event.type !== "keyup") {
        let element = (event?.target as HTMLElement)?.closest(`.overlay-button`);
        let dataset = (element as HTMLElement).dataset;

        if (dataset.overlayButton) keyReleased = dataset.overlayButton;
      }

      let keysPressedUpdate = keysPressed;
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

      if (event.type !== "keyup") {
        keysPressedUpdate["north"] = false;
        keysPressedUpdate["east"] = false;
        keysPressedUpdate["south"] = false;
        keysPressedUpdate["west"] = false;
      }

      setKeysPressed(keysPressedUpdate);

      var filtered = Object.keys(keysPressedUpdate).filter(function (key) {
        type keysPressedUpdateKey = keyof typeof keysPressedUpdate;
        return keysPressedUpdate[key as keysPressedUpdateKey];
      });

      type directonEnumKeyType = keyof typeof DirectionEnum;

      setPlayerDirectionToMove(null);
      setPlayerDirectionToMove(DirectionEnum[filtered.toString() as directonEnumKeyType]);

      const playerHasStopped = filtered.length < 1;
      dispatch(setPlayerIsMoving(!playerHasStopped));

      if (DirectionEnum[filtered.toString() as directonEnumKeyType] !== undefined) {
        dispatch(setPlayerDirecton(DirectionEnum[filtered.toString() as directonEnumKeyType]));
      } else {
        clearTimeout(_playerMoveTimeout.current);
      }
    },
    [mapPosition]
  );

  const handleDocumentMouseDown = useCallback((event: MouseEvent | TouchEvent) => {
    if (modalIsVisible && (event.target as HTMLElement).closest("#modal") === null) hideModal();
  }, []);

  const introMessage = () => {
    const introMessageSeen = localStorage.getItem("introMessageSeen");

    if (introMessageSeen !== null) return;

    setTimeout(() => {
      setModalContents({
        head: "Welcome!",
        body: <IntroMessageModalContents />,
      });
      updateModal(modalContentsRef.current);
      showModal();

      localStorage.setItem("introMessageSeen", "true");
    }, 200);
  };

  useEffect(() => {
    if (_playerMoveTimeout !== undefined) clearTimeout(_playerMoveTimeout.current);

    if (playerIsMoving) playerMove(null);
  }, [playerIsMoving]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("mousedown", handleDocumentMouseDown);
    document.addEventListener("touchstart", handleDocumentMouseDown);

    document.body.classList.remove("body-intro");
    introMessage();

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("mousedown", handleDocumentMouseDown);
      document.removeEventListener("touchstart", handleDocumentMouseDown);
    };
  }, [handleKeyPress, handleKeyUp]);

  useEffect(() => {
    triggerTransitionAnimation();
  }, [themeIsDarkMode]);

  let worldMapStyle = {
    top: `calc(50% + ${mapPosition[1]}px - ((${Math.round(mapSizeByTile[1]) / 2} * ${_tileHeight}px)))`,
    left: `calc(50% + ${mapPosition[0]}px - ((${Math.round(mapSizeByTile[0]) / 2} * ${_tileWidth}px)))`,
    width: `calc((${_tileWidth} / 16) * ${mapSizeByTile[0]}em)`,
  };

  return (
    <>
      <div className="overlay-buttons-container">
        <OverlayActionButtons handleAButtonPress={handleAButtonPress} handleXButtonPress={handleXButtonPress}></OverlayActionButtons>
        <OverlayArrowButtons handleKeyPress={handleKeyPress} handleKeyUp={handleKeyUp}></OverlayArrowButtons>
      </div>
      <div id="appContainer" className="crt">
        <div className="App">
          <div id="world-map-outer">
            <div id="world-map-container" style={worldMapStyle}>
              <WorldMap tileMap={tileMap}></WorldMap>
              {tileMap === overWorldMap && <Windmill themeIsDarkMode={themeIsDarkMode}></Windmill>}
              {tileMap === overWorldMap && <RubberDuck themeIsDarkMode={themeIsDarkMode}></RubberDuck>}
              {tileMap === skillsMap && <Skills></Skills>}
              <Player></Player>
            </div>
          </div>
        </div>
        <div id="transitionScreen" className="transition" ref={transitionRef}></div>
      </div>
    </>
  );
}

export default App;
