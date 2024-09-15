// #region Import Region
// Import React
import React, { useCallback, useEffect, useRef } from "react";
import useState from "react-usestateref";

// Import Maps
import { overWorldMap } from "../maps/overworldMap.js";
import { skillsMap } from "../maps/skillsMap.js";
import { portfolioMap } from "../maps/portfolioMap.js";
import { homeMap } from "../maps/homeMap.js";

// Import Game Logic
import CollisionLevel from "../enums/CollisionLevelEnum.js";
import DirectionEnum from "../enums/DirectionEnum.js";
import Map from "../enums/MapEnum.js";
import tileCollisionLevels from "../scripts/TileCollisionLevels.js";

// Import Modals
import SensoModalContents from "./modals/SensoModalContents.js";
import HerbalCraftModalContents from "./modals/HerbalCraftModalContents.js";
import BenMarshallModalContents from "./modals/BenMarshallModalContents.js";
import FallingBlockGameModalContents from "./modals/FallingBlockGameModalContents.js";
import HtmlModalContents from "./modals/HtmlModalContents.js";
import CssModalContents from "./modals/CssModalContents.js";
import JavascriptModalContents from "./modals/JavascriptModalContents.js";
import ReactModalContents from "./modals/ReactModalContents.js";
import DotNetModalContents from "./modals/DotNetModalContents.js";
import CSharpModalContents from "./modals/CSharpModalContents.js";
import SqlModalContents from "./modals/SqlModalContents.js";
import OtherModalContents from "./modals/OtherModalContents.js";
import IntroMessageModalContents from "./modals/IntroMessageModalContents";

// Import Styles
import "../App.css";

import { gsap } from "gsap";

// Import Components
import OverlayActionButtons from "./OverlayActionButtons.js";
import OverlayArrowButtons from "./OverlayArrowButtons.js";
import Player from "./Player.js";
import Skills from "./Skills.js";
import RubberDuck from "./RubberDuck.js";
import Windmill from "./Windmill.js";
import WorldMap from "./WorldMap.js";

// #endregion

function App({ updateModal, showModal, hideModal, modalIsVisible, modalContent, themeIsDarkMode, isTouchDevice }) {
  const _tileWidth = 64;
  const _tileHeight = 64;

  const _allowedInputKeys = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"];
  let _playerMoveTimeout = useRef(null);
  let _playerAnimationTimeout = useRef(null);

  const [tileMap, setTileMap, tileMapRef] = useState(overWorldMap);
  const [mapSizeByTile, setMapSizeByTile] = useState([37, 25]);
  const [mapPosition, setMapPosition] = useState([0, 0]);

  const [keysPressed, setKeysPressed] = useState({
    north: false,
    east: false,
    south: false,
    west: false,
  });
  const [playerPosition, setPlayerPosition, playerPositionRef] = useState([18, 12]);
  const [playerDirection, setPlayerdirection, playerDirectionRef] = useState(DirectionEnum.west);
  const [playerDirectionToMove, setPlayerDirectionToMove, playerDirectionToMoveRef] = useState(null);
  const [playerIsMoving, setPlayerIsMoving, playerIsMovingRef] = useState(false);
  const [playerCanInteract, setPlayerCanInteract] = useState(false);
  const [showPlayerAnimationFrame, setShowPlayerAnimationFrame] = useState(false);

  const transitionRef = useRef();

  const [modalContents, setModalContents, modalContentsRef] = useState("");

  const playerMove = (playerDirectionToMoveLocal = null) => {
    if (!playerIsMovingRef.current) return;

    if (playerDirectionToMoveLocal === null) playerDirectionToMoveLocal = playerDirectionToMoveRef.current;

    setShowPlayerAnimationFrame(true);

    switch (playerDirectionToMoveLocal) {
      case DirectionEnum.east:
        let playerCanMoveEast =
          tileCollisionLevels[tileMapRef.current[playerPositionRef.current[1]][playerPositionRef.current[0] + 1]] !== CollisionLevel.block;
        if (!playerCanMoveEast) break;

        setPlayerPosition((playerPosition) => [playerPositionRef.current[0] + 1, playerPositionRef.current[1]]);
        setMapPosition((mapPosition) => [mapPosition[0] - _tileWidth, mapPosition[1]]);
        break;
      case DirectionEnum.south:
        let playerCanMoveSouth =
          tileCollisionLevels[tileMapRef.current[playerPositionRef.current[1] + 1][playerPositionRef.current[0]]] !== CollisionLevel.block;
        if (!playerCanMoveSouth) break;

        setPlayerPosition((playerPosition) => [playerPositionRef.current[0], playerPositionRef.current[1] + 1]);
        setMapPosition((mapPosition) => [mapPosition[0], mapPosition[1] - _tileHeight]);
        break;
      case DirectionEnum.west:
        let playerCanMoveWest =
          tileCollisionLevels[tileMapRef.current[playerPositionRef.current[1]][playerPositionRef.current[0] - 1]] !== CollisionLevel.block;
        if (!playerCanMoveWest) break;

        setPlayerPosition((playerPosition) => [playerPositionRef.current[0] - 1, playerPositionRef.current[1]]);
        setMapPosition((mapPosition) => [mapPosition[0] + _tileWidth, mapPosition[1]]);
        break;
      case DirectionEnum.north:
        let playerCanMoveNorth =
          tileCollisionLevels[tileMapRef.current[playerPositionRef.current[1] - 1][playerPositionRef.current[0]]] !== CollisionLevel.block;
        if (!playerCanMoveNorth) break;

        setPlayerPosition((playerPosition) => [playerPositionRef.current[0], playerPositionRef.current[1] - 1]);
        setMapPosition((mapPosition) => [mapPosition[0], mapPosition[1] + _tileHeight]);
        break;
    }

    let tile = tileMapRef.current[playerPositionRef.current[1]][playerPositionRef.current[0]];

    warpTileLand(tile[0]);
    interactTileLand(tile[0]);

    _playerAnimationTimeout = setTimeout(() => {
      setShowPlayerAnimationFrame(false);
    }, 50);

    _playerMoveTimeout.current = setTimeout(() => {
      if (playerIsMovingRef.current) playerMove(null);
    }, 100);
  };

  const warpTileLand = (tile) => {
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

  const interactTileLand = (tile) => {
    const interactTiles = [714, 827, 920];

    setPlayerCanInteract(false);

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

    if (htmlInteractTiles.includes(playerPosition.toString()) && playerDirectionRef.current === DirectionEnum.north) {
      setPlayerCanInteract(true);
      setModalContents({ head: "HTML", body: <HtmlModalContents /> });
    }

    if (cssInteractTiles.includes(playerPosition.toString()) && playerDirectionRef.current === DirectionEnum.north) {
      setPlayerCanInteract(true);
      setModalContents({ head: "CSS", body: <CssModalContents /> });
    }

    if (javascriptInteractTiles.includes(playerPosition.toString()) && playerDirectionRef.current === DirectionEnum.north) {
      setPlayerCanInteract(true);
      setModalContents({
        head: "JAVASCRIPT",
        body: <JavascriptModalContents />,
      });
    }

    if (reactInteractTiles.includes(playerPosition.toString()) && playerDirectionRef.current === DirectionEnum.north) {
      setPlayerCanInteract(true);
      setModalContents({ head: "REACT", body: <ReactModalContents /> });
    }

    if (dotNetInteractTiles.includes(playerPosition.toString()) && playerDirectionRef.current === DirectionEnum.north) {
      setPlayerCanInteract(true);
      setModalContents({ head: ".NET", body: <DotNetModalContents /> });
    }

    if (cSharpInteractTiles.includes(playerPosition.toString()) && playerDirectionRef.current === DirectionEnum.north) {
      setPlayerCanInteract(true);
      setModalContents({ head: "C#", body: <CSharpModalContents /> });
    }

    if (sqlInteractTiles.includes(playerPosition.toString()) && playerDirectionRef.current === DirectionEnum.north) {
      setPlayerCanInteract(true);
      setModalContents({ head: "SQL", body: <SqlModalContents /> });
    }

    if (otherInteractTiles.includes(playerPosition.toString()) && playerDirectionRef.current === DirectionEnum.north) {
      setPlayerCanInteract(true);
      setModalContents({ head: "OTHER", body: <OtherModalContents /> });
    }
  };

  const handlePortfolioInteract = () => {
    const playerPosition = playerPositionRef.current;
    const sensoInteractTiles = [[3, 4].toString(), [4, 4].toString(), [5, 4].toString()];
    const herbalCraftInteractTiles = [[7, 4].toString(), [8, 4].toString(), [9, 4].toString(), [10, 4].toString()];
    const benMarshallInteractTiles = [[12, 4].toString(), [13, 4].toString()];

    if (sensoInteractTiles.includes(playerPosition.toString()) && playerDirectionRef.current === DirectionEnum.north) {
      setPlayerCanInteract(true);
      setModalContents({ head: "SENSO", body: <SensoModalContents /> });
    }

    if (herbalCraftInteractTiles.includes(playerPosition.toString()) && playerDirectionRef.current === DirectionEnum.north) {
      setPlayerCanInteract(true);
      setModalContents({
        head: "HERBAL CRAFT",
        body: <HerbalCraftModalContents />,
      });
    }

    if (benMarshallInteractTiles.includes(playerPosition.toString()) && playerDirectionRef.current === DirectionEnum.north) {
      setPlayerCanInteract(true);
      setModalContents({
        head: "BEN MARSHALL PRODUCTION",
        body: <BenMarshallModalContents />,
      });
    }
  };

  const handleHomeInteract = () => {
    const playerPosition = playerPositionRef.current;
    const videoGameTiles = [[3, 4].toString(), [4, 4].toString(), [5, 4].toString()];

    if (videoGameTiles.includes(playerPosition.toString()) && playerDirectionRef.current === DirectionEnum.north) {
      setPlayerCanInteract(true);
      setModalContents({
        head: '"Falling Block Game"',
        body: <FallingBlockGameModalContents />,
      });
    }
  };

  const loadMap = (mapToLoad) => {
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

  const setPlayerInside = (playerIsInside) => {
    var body = document.getElementsByTagName("body")[0];
    body.setAttribute("data-player-inside", playerIsInside);
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
    (event) => {
      let keyPressed = event.key;

      // Avoid duplicate triggers from touch devices that also register mouse events
      if (event.type === "mousedown" && isTouchDevice()) return;

      // User hovers over a button but isn't clicking
      if (event.type !== "keydown" && event.buttons < 1) return;

      // User is clicking a button
      if (event.type !== "keydown") keyPressed = event.target.closest(`.overlay-button`).dataset.overlayButton;

      // Handle user inputting 'a' or 'x' in contact form
      let contactModalLoaded = modalContent.current.head === "Contact" && modalIsVisible.current;

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
      let playerDirectionToMoveLocal;

      switch (keyPressed) {
        case "ArrowRight":
          setPlayerdirection(DirectionEnum.east);
          playerDirectionToMoveLocal = DirectionEnum.east;
          keysPressedUpdate.east = true;
          break;
        case "ArrowDown":
          setPlayerdirection(DirectionEnum.south);
          playerDirectionToMoveLocal = DirectionEnum.south;
          keysPressedUpdate.south = true;
          break;
        case "ArrowLeft":
          setPlayerdirection(DirectionEnum.west);
          playerDirectionToMoveLocal = DirectionEnum.west;
          keysPressedUpdate.west = true;
          break;
        case "ArrowUp":
          setPlayerdirection(DirectionEnum.north);
          playerDirectionToMoveLocal = DirectionEnum.north;
          keysPressedUpdate.north = true;
          break;
      }

      setPlayerDirectionToMove(playerDirectionToMoveLocal);

      if (callPlayerMove) {
        setPlayerIsMoving(true);
      }

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
    (event) => {
      let keyReleased = event.key;

      if (event.type !== "keyup") keyReleased = event.target.dataset.overlayButton;

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
        return keysPressedUpdate[key];
      });

      setPlayerDirectionToMove(null);
      setPlayerDirectionToMove(DirectionEnum[filtered]);

      const playerHasStopped = filtered.length < 1;
      setPlayerIsMoving(!playerHasStopped);

      if (DirectionEnum[filtered] !== undefined) {
        setPlayerdirection(DirectionEnum[filtered]);
      } else {
        clearTimeout(_playerMoveTimeout);
      }
    },
    [mapPosition]
  );

  const handleDocumentMouseDown = useCallback((event) => {
    if (modalIsVisible && event.target.closest("#modal") === null) hideModal();
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
              {<WorldMap tileMap={tileMap}></WorldMap>}
              {tileMap === overWorldMap && <Windmill themeIsDarkMode={themeIsDarkMode}></Windmill>}
              {tileMap === overWorldMap && <RubberDuck themeIsDarkMode={themeIsDarkMode}></RubberDuck>}
              {tileMap === skillsMap && <Skills></Skills>}
              <Player playerDirection={playerDirection} showPlayerAnimationFrame={showPlayerAnimationFrame} playerCanInteract={playerCanInteract}></Player>
            </div>
          </div>
        </div>
        <div id="transitionScreen" className="transition" ref={transitionRef}></div>
      </div>
    </>
  );
}

export default App;
