// #region Import Region 
// Import React
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import useState from 'react-usestateref';

// Import FontAwesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import Maps
import { overWorldMap } from "../maps/overworldMap.js"
import { skillsMap } from "../maps/skillsMap.js"
import { portfolioMap } from "../maps/portfolioMap.js"
import { homeMap } from "../maps/homeMap.js"

// Import Game Logic
import tileMapEnum from "../scripts/TileMapEnum.js"
import { directionEnum, collisionLevel, map } from "../scripts/Enums.js"
import tileCollisionLevels from "../scripts/TileCollisionLevels.js"

// Import Modals
import SensoModalContents from './modals/SensoModalContents.js'
import HerbalCraftModalContents from './modals/HerbalCraftModalContents.js'
import BenMarshallModalContents from './modals/BenMarshallModalContents.js'
import FallingBlockGameModalContents from './modals/FallingBlockGameModalContents.js'
import HtmlModalContents from './modals/HtmlModalContents.js'
import CssModalContents from './modals/CssModalContents.js'
import JavascriptModalContents from './modals/JavascriptModalContents.js'
import ReactModalContents from './modals/ReactModalContents.js'
import DotNetModalContents from './modals/DotNetModalContents.js'
import CSharpModalContents from './modals/CSharpModalContents.js'
import SqlModalContents from './modals/SqlModalContents.js'
import OtherModalContents from './modals/OtherModalContents.js'

// Import Styles
import '../App.css';
// #endregion

function App({ updateModal, showModal, hideModal }) {
  var images = {
    WindmillBlades: require("../img/WindmillBlades.png"),
    SkillsHtml: require("../img/SkillsHtml.png"),
    SkillsCss: require("../img/SkillsCss.png"),
    SkillsJs: require("../img/SkillsJs.png"),
    SkillsReact: require("../img/SkillsReact.png"),
    SkillsDotNet: require("../img/SkillsDotNet.png"),
    SkillsCSharp: require("../img/SkillsCSharp.png"),
    SkillsSql: require("../img/SkillsSql.png"),
    SkillsOther: require("../img/SkillsOther.png")
  };

  const _tileWidth = 64;
  const _tileHeight = 64;

  const _allowedInputKeys = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'];
  let _playerMoveTimeout = useRef(null);
  let _playerAnimationTimeout = useRef(null);

  const [tileMap, setTileMap, tileMapRef] = useState(overWorldMap);
  const [mapSizeByTile, setMapSizeByTile] = useState([37, 25]);
  const [mapPosition, setMapPosition] = useState([0, 0]);

  const [keysPressed, setKeysPressed] = useState({ north: false, east: false, south: false, west: false });
  const [playerPosition, setPlayerPosition, playerPositionRef] = useState([18, 12]);
  const [playerDirection, setPlayerdirection] = useState(directionEnum.west);
  const [playerDirectionToMove, setPlayerDirectionToMove, playerDirectionToMoveRef] = useState(null);
  const [playerIsMoving, setPlayerIsMoving, playerIsMovingRef] = useState(false);
  const [playerCanInteract, setPlayerCanInteract] = useState(false);
  const [showPlayerAnimationFrame, setShowPlayerAnimationFrame] = useState(false);

  const [modalContents, setModalContents] = useState("");

  const getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
  }

  const worldMapCreator = () => {
    let worldMap = [];
    let tileIteration = 0;

    for (let row = 0; row < tileMap.length; row++) {
      for (let col = 0; col < tileMap[0].length; col++) {
        let tile = getKeyByValue(tileMapEnum, tileMap[row][col][0]);

        worldMap[tileIteration] = <div className="map-tile" data-position={col + ',' + row} data-tile={tile} key={tileIteration}></div>;
        tileIteration++;
      }
    }

    return worldMap;
  };

  const windmillBladeCreator = () => {
    let windmillBlades = <div id="windmill-blades"><img
      alt="windmill blades"
      src={images.WindmillBlades}
    ></img></div>;

    return windmillBlades;
  }

  const skillsCreator = () => {
    let skillsContainer = <div id="skills-container">
      <img
        id="skills-html"
        alt="skills - html"
        src={images.SkillsHtml}
      ></img>
      <img
        id="skills-css"
        alt="skills - css"
        src={images.SkillsCss}
      ></img>
      <img
        id="skills-js"
        alt="skills - javascript"
        src={images.SkillsJs}
      ></img>
      <img
        id="skills-react"
        alt="skills - react"
        src={images.SkillsReact}
      ></img>
      <img
        id="skills-dot-net"
        alt="skills - dot net"
        src={images.SkillsDotNet}
      ></img>
      <img
        id="skills-c-sharp"
        alt="skills - c#"
        src={images.SkillsCSharp}
      ></img>
      <img
        id="skills-sql"
        alt="skills - sql"
        src={images.SkillsSql}
      ></img>
      <img
        id="skills-other"
        alt="skills - other"
        src={images.SkillsOther}
      ></img>
    </div>;

    return skillsContainer;
  }

  const playerCreator = () => {
    let tileValue;

    switch (playerDirection) {
      case directionEnum.north:
        tileValue = showPlayerAnimationFrame ? tileMapEnum.playerNorthMove : tileMapEnum.playerNorth;
        break;
      case directionEnum.east:
        tileValue = showPlayerAnimationFrame ? tileMapEnum.playerEastMove : tileMapEnum.playerEast;
        break;
      case directionEnum.south:
        tileValue = showPlayerAnimationFrame ? tileMapEnum.playerSouthMove : tileMapEnum.playerSouth;
        break;
      case directionEnum.west:
        tileValue = showPlayerAnimationFrame ? tileMapEnum.playerWestMove : tileMapEnum.playerWest;
        break;
    }

    let tile = getKeyByValue(tileMapEnum, tileValue);

    let playerAlert = playerCanInteract ? <div id="playerAlert"><div id="playerAlertA"></div></div> : "";
    return <>
      {playerAlert}
      <div id="player" data-tile={tile}></div>
    </>;
  }

  const playerMove = (playerDirectionToMoveLocal = null) => {
    if (!playerIsMovingRef.current)
      return;

    if (playerDirectionToMoveLocal === null)
      playerDirectionToMoveLocal = playerDirectionToMoveRef.current;

    setShowPlayerAnimationFrame(true);

    switch (playerDirectionToMoveLocal) {
      case directionEnum.east:
        let playerCanMoveEast = tileCollisionLevels[tileMapRef.current[playerPositionRef.current[1]][playerPositionRef.current[0] + 1]] !== collisionLevel.block;
        if (!playerCanMoveEast)
          break;

        setPlayerPosition(playerPosition => [playerPositionRef.current[0] + 1, playerPositionRef.current[1]]);
        setMapPosition(mapPosition => [mapPosition[0] - _tileWidth, mapPosition[1]]);
        break;
      case directionEnum.south:
        let playerCanMoveSouth = tileCollisionLevels[tileMapRef.current[playerPositionRef.current[1] + 1][playerPositionRef.current[0]]] !== collisionLevel.block;
        if (!playerCanMoveSouth)
          break;

        setPlayerPosition(playerPosition => [playerPositionRef.current[0], playerPositionRef.current[1] + 1]);
        setMapPosition(mapPosition => [mapPosition[0], mapPosition[1] - _tileHeight]);
        break;
      case directionEnum.west:
        let playerCanMoveWest = tileCollisionLevels[tileMapRef.current[playerPositionRef.current[1]][playerPositionRef.current[0] - 1]] !== collisionLevel.block;
        if (!playerCanMoveWest)
          break;

        setPlayerPosition(playerPosition => [playerPositionRef.current[0] - 1, playerPositionRef.current[1]]);
        setMapPosition(mapPosition => [mapPosition[0] + _tileWidth, mapPosition[1]]);
        break;
      case directionEnum.north:
        let playerCanMoveNorth = tileCollisionLevels[tileMapRef.current[playerPositionRef.current[1] - 1][playerPositionRef.current[0]]] !== collisionLevel.block;
        if (!playerCanMoveNorth)
          break;

        setPlayerPosition(playerPosition => [playerPositionRef.current[0], playerPositionRef.current[1] - 1]);
        setMapPosition(mapPosition => [mapPosition[0], mapPosition[1] + _tileHeight]);
        break;
    }

    let tile = tileMapRef.current[playerPositionRef.current[1]][playerPositionRef.current[0]];

    warpTileLand(tile[0]);
    interactTileLand(tile[0]);

    _playerAnimationTimeout = setTimeout(() => {
      setShowPlayerAnimationFrame(false);
    }, 50);

    _playerMoveTimeout.current = setTimeout(() => {
      if (playerIsMovingRef.current)
        playerMove(null);
    }, 100);

  };

  const warpTileLand = (tile) => {
    const warpTiles = [608, 726, 829, 929];

    if (!warpTiles.includes(tile))
      return

    const playerPosition = playerPositionRef.current;
    const skillsEntrance = [18, 7].toString();
    const skillsExit = [2, 13].toString();
    const portfolioEntrance = [23, 14].toString();
    const portfolioExit = [2, 6].toString();
    const homeEntrance = [7, 11].toString();
    const homeExit = [2, 8].toString();

    switch (playerPosition.toString()) {
      case skillsEntrance:
        loadMap(map.skills);
        break;
      case portfolioEntrance:
        loadMap(map.portfolio);
        break;
      case homeEntrance:
        loadMap(map.home);
        break
      case skillsExit:
        loadMap(map.worldFromSkills);
        break;
      case portfolioExit:
        loadMap(map.worldFromPortfolio);
        break;
      case homeExit:
        loadMap(map.worldFromHome);
        break;
    }
  }

  const interactTileLand = (tile) => {
    const interactTiles = [714, 827, 920];

    if (!interactTiles.includes(tile))
      return

    setPlayerCanInteract(false);
    switch (tile) {
      case 714:
        handleSkillsInteract();
        break;
      case 827:
        handlePortfolioInteract();
        break;
      case 920:
        handleHomeInteract();
        break
    }
  }

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

    if (htmlInteractTiles.includes(playerPosition.toString()) && playerDirection === directionEnum.north) {
      setPlayerCanInteract(true);
      setModalContents({ head: "HTML", body: <HtmlModalContents /> });
    }

    if (cssInteractTiles.includes(playerPosition.toString()) && playerDirection === directionEnum.north) {
      setPlayerCanInteract(true);
      setModalContents({ head: "CSS", body: <CssModalContents /> });
    }

    if (javascriptInteractTiles.includes(playerPosition.toString()) && playerDirection === directionEnum.north) {
      setPlayerCanInteract(true);
      setModalContents({ head: "JAVASCRIPT", body: <JavascriptModalContents /> });
    }

    if (reactInteractTiles.includes(playerPosition.toString()) && playerDirection === directionEnum.north) {
      setPlayerCanInteract(true);
      setModalContents({ head: "REACT", body: <ReactModalContents /> });
    }

    if (dotNetInteractTiles.includes(playerPosition.toString()) && playerDirection === directionEnum.north) {
      setPlayerCanInteract(true);
      setModalContents({ head: ".NET", body: <DotNetModalContents /> });
    }

    if (cSharpInteractTiles.includes(playerPosition.toString()) && playerDirection === directionEnum.north) {
      setPlayerCanInteract(true);
      setModalContents({ head: "C#", body: <CSharpModalContents /> });
    }

    if (sqlInteractTiles.includes(playerPosition.toString()) && playerDirection === directionEnum.north) {
      setPlayerCanInteract(true);
      setModalContents({ head: "SQL", body: <SqlModalContents /> });
    }

    if (otherInteractTiles.includes(playerPosition.toString()) && playerDirection === directionEnum.north) {
      setPlayerCanInteract(true);
      setModalContents({ head: "OTHER", body: <OtherModalContents /> });
    }
  }

  const handlePortfolioInteract = () => {
    const playerPosition = playerPositionRef.current;
    const sensoInteractTiles = [[3, 4].toString(), [4, 4].toString(), [5, 4].toString()];
    const herbalCraftInteractTiles = [[7, 4].toString(), [8, 4].toString(), [9, 4].toString(), [10, 4].toString()];
    const benMarshallInteractTiles = [[12, 4].toString(), [13, 4].toString()];

    if (sensoInteractTiles.includes(playerPosition.toString()) && playerDirection === directionEnum.north) {
      setPlayerCanInteract(true);
      setModalContents({ head: "SENSO", body: <SensoModalContents /> });
    }

    if (herbalCraftInteractTiles.includes(playerPosition.toString()) && playerDirection === directionEnum.north) {
      setPlayerCanInteract(true);
      setModalContents({ head: "HERBAL CRAFT", body: <HerbalCraftModalContents /> });
    }

    if (benMarshallInteractTiles.includes(playerPosition.toString()) && playerDirection === directionEnum.north) {
      setPlayerCanInteract(true);
      setModalContents({ head: "BEN MARSHALL PRODUCTION", body: <BenMarshallModalContents /> });
    }
  }

  const handleHomeInteract = () => {
    const playerPosition = playerPositionRef.current;
    const videoGameTiles = [[3, 4].toString(), [4, 4].toString(), [5, 4].toString()];

    if (videoGameTiles.includes(playerPosition.toString()) && playerDirection === directionEnum.north) {
      setPlayerCanInteract(true);
      setModalContents({ head: '"Falling Block Game"', body: <FallingBlockGameModalContents /> });
    }
  }

  const loadMap = (mapToLoad) => {
    switch (mapToLoad) {
      case map.worldFromSkills:
        setMapSizeByTile([37, 25]);
        setTileMap(overWorldMap);
        setPlayerPosition([18, 8]);
        setMapPosition([_tileWidth * 0, _tileHeight * 4]);
        document.body.style.backgroundColor = "var(--primary-accent-color)";
        break;
      case map.skills:
        setMapSizeByTile([15, 15]);
        setTileMap(skillsMap);
        setPlayerPosition([2, 12]);
        setMapPosition([_tileWidth * 5, _tileHeight * -5]);
        document.body.style.backgroundColor = "black";
        break;
      case map.worldFromPortfolio:
        setMapSizeByTile([37, 25]);
        setTileMap(overWorldMap);
        setPlayerPosition([23, 15]);
        setMapPosition([_tileWidth * -5, _tileHeight * -3]);
        document.body.style.backgroundColor = "var(--primary-accent-color)";
        break;
      case map.portfolio:
        setMapSizeByTile([17, 7]);
        setTileMap(portfolioMap);
        setPlayerPosition([2, 5]);
        setMapPosition([_tileWidth * 6, _tileHeight * -2]);
        document.body.style.backgroundColor = "black";
        break;
      case map.worldFromHome:
        setMapSizeByTile([37, 25]);
        setTileMap(overWorldMap);
        setPlayerPosition([7, 12]);
        setMapPosition([_tileWidth * 11, _tileHeight * 0]);
        document.body.style.backgroundColor = "var(--primary-accent-color)";
        break;
      case map.home:
        setMapSizeByTile([11, 9]);
        setTileMap(homeMap);
        setPlayerPosition([2, 7]);
        setMapPosition([_tileWidth * 3, _tileHeight * -3]);
        document.body.style.backgroundColor = "black";
        break;
    }
  }

  const handleKeyPress = useCallback((event) => {
    let keyPressed = event.key;

    // User hovers over a button but isn't clicking
    if (event.type !== 'keydown' && event.buttons < 1)
      return

    // User is clicking a button
    if (event.type !== 'keydown')
      keyPressed = event.target.dataset.overlayButton;

    if (keyPressed === 'a') {
      handleAButtonPress();
    }

    if (keyPressed === 'x') {
      handleXButtonPress();
    }

    if (!_allowedInputKeys.includes(keyPressed))
      return;

    let keysPressedUpdate = keysPressed;
    let callPlayerMove = Object.values(keysPressed).every((key) => key === false);
    let playerDirectionToMoveLocal;

    switch (keyPressed) {
      case "ArrowRight":
        setPlayerdirection(directionEnum.east);
        playerDirectionToMoveLocal = directionEnum.east;
        keysPressedUpdate.east = true;
        break;
      case "ArrowDown":
        setPlayerdirection(directionEnum.south);
        playerDirectionToMoveLocal = directionEnum.south;
        keysPressedUpdate.south = true;
        break;
      case "ArrowLeft":
        setPlayerdirection(directionEnum.west);
        playerDirectionToMoveLocal = directionEnum.west;
        keysPressedUpdate.west = true;
        break;
      case "ArrowUp":
        setPlayerdirection(directionEnum.north);
        playerDirectionToMoveLocal = directionEnum.north;
        keysPressedUpdate.north = true;
        break;
    }

    setPlayerDirectionToMove(playerDirectionToMoveLocal);

    if (callPlayerMove) {
      setPlayerIsMoving(true);
    }

    setKeysPressed(keysPressedUpdate);
  }, [mapPosition, playerDirectionToMove, playerIsMoving]);

  const handleAButtonPress = () => {
    if (!playerCanInteract)
      return

    updateModal(modalContents);
    showModal();
  }

  const handleXButtonPress = () => {
    hideModal();
  }

  const handleKeyUp = useCallback((event) => {
    let keyReleased = event.key;

    if (event.type !== 'keyup')
      keyReleased = event.target.dataset.overlayButton;

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

    if (event.type !== 'keyup') {
      keysPressedUpdate['north'] = false;
      keysPressedUpdate['east'] = false;
      keysPressedUpdate['south'] = false;
      keysPressedUpdate['west'] = false;
    }

    setKeysPressed(keysPressedUpdate);

    var filtered = Object.keys(keysPressedUpdate).filter(function (key) {
      return keysPressedUpdate[key]
    });

    setPlayerDirectionToMove(null);
    setPlayerDirectionToMove(directionEnum[filtered]);

    const playerHasStopped = filtered.length < 1;
    setPlayerIsMoving(!playerHasStopped);

    if (directionEnum[filtered] !== undefined) {
      setPlayerdirection(directionEnum[filtered]);
    } else {
      clearTimeout(_playerMoveTimeout);
    }
  }, [mapPosition]);

  useEffect(() => {
    if (_playerMoveTimeout !== undefined)
      clearTimeout(_playerMoveTimeout.current);

    if (playerIsMoving)
      playerMove(null);

  }, [playerIsMoving])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyPress, handleKeyUp]);

  let worldMapStyle = {
    top: `calc(50% + ${mapPosition[1]}px - ((${Math.round(mapSizeByTile[1]) / 2} * ${_tileHeight}px)))`,
    left: `calc(50% + ${mapPosition[0]}px - ((${Math.round(mapSizeByTile[0]) / 2} * ${_tileWidth}px)))`,
    width: `calc(${_tileWidth} * ${mapSizeByTile[0]}px)`
  }

  return (
    <>
      <div className="overlay-buttons-container">
        <div className="overlay-buttons-action">
          <div className="overlay-button overlay-buttons-a" onTouchStart={handleAButtonPress} onClick={handleAButtonPress}><FontAwesomeIcon icon={['fas', 'a']} className="overlay-button-icon text-no-select" /></div>
          <div className="overlay-button overlay-buttons-x" onTouchStart={handleXButtonPress} onClick={handleXButtonPress}><FontAwesomeIcon icon={['fas', 'x']} className="overlay-button-icon text-no-select" /></div>
        </div>
        <div className="overlay-buttons-arrows">
          <div className="overlay-button overlay-buttons-up" data-overlay-button="ArrowUp" onTouchStart={handleKeyPress} onTouchEnd={handleKeyUp} onMouseDown={handleKeyPress} onMouseOver={handleKeyPress} onMouseLeave={handleKeyUp} onMouseUp={handleKeyUp}><FontAwesomeIcon icon={['fas', 'arrow-up']} className="overlay-button-icon text-no-select" data-overlay-button="ArrowUp" /></div>
          <div className="overlay-button overlay-buttons-right" data-overlay-button="ArrowRight" onTouchStart={handleKeyPress} onTouchEnd={handleKeyUp} onMouseDown={handleKeyPress} onMouseOver={handleKeyPress} onMouseLeave={handleKeyUp} onMouseUp={handleKeyUp}><FontAwesomeIcon icon={['fas', 'arrow-right']} className="overlay-button-icon text-no-select" data-overlay-button="ArrowRight" /></div>
          <div className="overlay-button overlay-buttons-down" data-overlay-button="ArrowDown" onTouchStart={handleKeyPress} onTouchEnd={handleKeyUp} onMouseDown={handleKeyPress} onMouseOver={handleKeyPress} onMouseLeave={handleKeyUp} onMouseUp={handleKeyUp}><FontAwesomeIcon icon={['fas', 'arrow-down']} className="overlay-button-icon text-no-select" data-overlay-button="ArrowDown" /></div>
          <div className="overlay-button overlay-buttons-left" data-overlay-button="ArrowLeft" onTouchStart={handleKeyPress} onTouchEnd={handleKeyUp} onMouseDown={handleKeyPress} onMouseOver={handleKeyPress} onMouseLeave={handleKeyUp} onMouseUp={handleKeyUp}><FontAwesomeIcon icon={['fas', 'arrow-left']} className="overlay-button-icon text-no-select" data-overlay-button="ArrowLeft" /></div>
        </div>
      </div>
      <div className="App crt">
        <div id="world-map-container" style={worldMapStyle}>
          {useMemo(() => worldMapCreator(tileMap), [tileMap])}
          {tileMap === overWorldMap && windmillBladeCreator()}
          {tileMap === skillsMap && skillsCreator()}
          {playerCreator()}
        </div>
      </div>
    </>
  );
}

export default App;