import DirectionEnum from "../../enums/Direction.enum";
import { MutableRefObject, useEffect, useRef } from "react";
import TileMap from "../../maps/TileMap";
import { _tileHeight, _tileWidth } from "../../scripts/Constants";
import { getKeyByValue } from "../../scripts/Utils";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setMapPosition, setMapSizeByTile, setTileMap } from "./mapSlice";
import {
  setPlayerCanInteract,
  setPlayerIsInside,
  setPlayerPosition,
  setPlayerPositionMoveEast,
  setPlayerPositionMoveNorth,
  setPlayerPositionMoveSouth,
  setPlayerPositionMoveWest,
  setShowPlayerAnimationFrame,
  updatePlayerTick,
} from "./playerSlice";
import Map from "../../enums/Map.enum";
import { overWorldMap } from "../../maps/overworldMap";
import { skillsMap } from "../../maps/skillsMap";
import { portfolioMap } from "../../maps/portfolioMap";
import { homeMap } from "../../maps/homeMap";
import { setModalHead, setModalName } from "../site/modalSlice";
import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import CollisionLevel from "../../enums/CollisionLevel.enum";
import tileCollisionLevelsMap from "../../scripts/TileCollisionLevels";

export default function Player({ triggerTransitionAnimation }: { triggerTransitionAnimation: () => void }) {
  const dispatch = useAppDispatch();

  const playerCanInteract = useAppSelector((state) => state.playerReducer.playerCanInteract);
  const playerDirection = useAppSelector((state) => state.playerReducer.playerDirection);
  const playerDirectionToMove = useAppSelector((state) => state.playerReducer.playerDirectionToMove);
  const playerIsInside = useAppSelector((state) => state.playerReducer.playerIsInside);
  const playerIsMoving = useAppSelector((state) => state.playerReducer.playerIsMoving);
  const playerPosition = useAppSelector((state) => state.playerReducer.playerPosition);
  const playerTick = useAppSelector((state) => state.playerReducer.playerTick);
  const showPlayerAnimationFrame = useAppSelector((state) => state.playerReducer.showPlayerAnimationFrame);
  const mapPosition = useAppSelector((state) => state.mapReducer.mapPosition);
  const tileMap = useAppSelector((state) => state.mapReducer.tileMap);
  const modalIsVisible = useAppSelector((state) => state.modalReducer.modalIsVisible);

  let _playerMoveTimeout: MutableRefObject<ReturnType<typeof setTimeout> | undefined> = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  let _playerAnimationTimeout: MutableRefObject<ReturnType<typeof setTimeout> | undefined> = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  let tileValue;

  const playerMove = () => {
    if (modalIsVisible) return;

    let tile = tileMap[playerPosition[1]][playerPosition[0]];
    let playerWillWarp = warpTileLand(tile[0]);
    interactTileLand(tile[0]);

    if (!playerIsMoving) return;

    dispatch(setShowPlayerAnimationFrame(true));

    if (!playerWillWarp) {
      switch (playerDirectionToMove) {
        case DirectionEnum.north:
          playerMoveUpdate(playerPosition[1] - 1, playerPosition[0], mapPosition[0], mapPosition[1] + _tileHeight, setPlayerPositionMoveNorth);
          break;
        case DirectionEnum.east:
          playerMoveUpdate(playerPosition[1], playerPosition[0] + 1, mapPosition[0] - _tileWidth, mapPosition[1], setPlayerPositionMoveEast);
          break;
        case DirectionEnum.south:
          playerMoveUpdate(playerPosition[1] + 1, playerPosition[0], mapPosition[0], mapPosition[1] - _tileHeight, setPlayerPositionMoveSouth);
          break;
        case DirectionEnum.west:
          playerMoveUpdate(playerPosition[1], playerPosition[0] - 1, mapPosition[0] + _tileWidth, mapPosition[1], setPlayerPositionMoveWest);
          break;
      }
    }

    _playerAnimationTimeout.current = setTimeout((current: any) => {
      dispatch(setShowPlayerAnimationFrame(false));
    }, 50);

    _playerMoveTimeout.current = setTimeout(() => {
      if (playerIsMoving) dispatch(updatePlayerTick());
    }, 100);
  };

  const playerMoveUpdate = (playerX: number, playerY: number, newMapX: number, newMapY: number, playerUpdateFunction: ActionCreatorWithoutPayload<any>) => {
    let playerCanMove = tileCollisionLevelsMap.get(tileMap[playerX][playerY][0]) !== CollisionLevel.block;

    if (!playerCanMove) return;

    dispatch(playerUpdateFunction());
    dispatch(setMapPosition([newMapX, newMapY]));
  };

  const warpTileLand = (tile: number): boolean => {
    const warpTiles = [608, 726, 829, 929];

    if (!warpTiles.includes(tile)) return false;

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
    return true;
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

  const loadMap = (mapToLoad: number) => {
    triggerTransitionAnimation();

    switch (mapToLoad) {
      case Map.worldFromSkills:
        updateLoadMap([37, 25], overWorldMap, [18, 8], [_tileWidth * 0, _tileHeight * 4], false);
        break;
      case Map.skills:
        updateLoadMap([15, 15], skillsMap, [2, 12], [_tileWidth * 5, _tileHeight * -5], true);
        break;
      case Map.worldFromPortfolio:
        updateLoadMap([37, 25], overWorldMap, [23, 15], [_tileWidth * -5, _tileHeight * -3], false);
        break;
      case Map.portfolio:
        updateLoadMap([17, 7], portfolioMap, [2, 5], [_tileWidth * 6, _tileHeight * -2], true);
        break;
      case Map.worldFromHome:
        updateLoadMap([37, 25], overWorldMap, [7, 12], [_tileWidth * 11, _tileHeight * 0], false);
        break;
      case Map.home:
        updateLoadMap([11, 9], homeMap, [2, 7], [_tileWidth * 3, _tileHeight * -3], true);
        break;
    }
  };

  const updateLoadMap = (
    mapSize: [number, number],
    map: number[][][],
    playerPosition: [number, number],
    mapPosition: [number, number],
    playerIsInside: boolean
  ) => {
    dispatch(setMapSizeByTile(mapSize));
    dispatch(setTileMap(map));
    dispatch(setPlayerPosition(playerPosition));
    dispatch(setMapPosition(mapPosition));
    dispatch(setPlayerIsInside(playerIsInside));
  };

  const handleSkillsInteract = () => {
    const htmlInteractTiles = [[2, 7].toString(), [3, 7].toString()];
    const cssInteractTiles = [[5, 7].toString(), [6, 7].toString()];
    const javascriptInteractTiles = [[8, 7].toString(), [9, 7].toString()];
    const reactInteractTiles = [[11, 7].toString(), [12, 7].toString()];
    const dotNetInteractTiles = [[2, 11].toString(), [3, 11].toString()];
    const cSharpInteractTiles = [[5, 11].toString(), [6, 11].toString()];
    const sqlInteractTiles = [[8, 11].toString(), [9, 11].toString()];
    const otherInteractTiles = [[11, 11].toString(), [12, 11].toString()];

    const skillTiles = [
      { tiles: htmlInteractTiles, head: "HTML", name: "HtmlModalContents" },
      { tiles: cssInteractTiles, head: "CSS", name: "CssModalContents" },
      { tiles: javascriptInteractTiles, head: "JAVASCRIPT", name: "JavascriptModalContents" },
      { tiles: reactInteractTiles, head: "REACT", name: "ReactModalContents" },
      { tiles: dotNetInteractTiles, head: ".NET", name: "DotNetModalContents" },
      { tiles: cSharpInteractTiles, head: "C#", name: "CSharpModalContents" },
      { tiles: sqlInteractTiles, head: "SQL", name: "SqlModalContents" },
      { tiles: otherInteractTiles, head: "OTHER", name: "OtherModalContents" },
    ];

    skillTiles.forEach((t) => updatePlayerCanInteract(t.tiles, t.head, t.name));
  };

  const handlePortfolioInteract = () => {
    const sensoInteractTiles = [[3, 4].toString(), [4, 4].toString(), [5, 4].toString()];
    const herbalCraftInteractTiles = [[7, 4].toString(), [8, 4].toString(), [9, 4].toString(), [10, 4].toString()];
    const benMarshallInteractTiles = [[12, 4].toString(), [13, 4].toString()];

    const portfolioTiles = [
      { tiles: sensoInteractTiles, head: "SENSO", name: "SensoModalContents" },
      { tiles: herbalCraftInteractTiles, head: "HERBAL CRAFT", name: "HerbalCraftModalContents" },
      { tiles: benMarshallInteractTiles, head: "BEN MARSHALL PRODUCTION", name: "BenMarshallModalContents" },
    ];

    portfolioTiles.forEach((t) => updatePlayerCanInteract(t.tiles, t.head, t.name));
  };

  const updatePlayerCanInteract = (tiles: string[], modalHead: string, modalName: string): void => {
    if (tiles.includes(playerPosition.toString()) && playerDirection === DirectionEnum.north) {
      dispatch(setPlayerCanInteract(true));
      dispatch(setModalHead(modalHead));
      dispatch(setModalName(modalName));
    }
  };

  const handleHomeInteract = () => {
    const videoGameTiles = [[3, 4].toString(), [4, 4].toString(), [5, 4].toString()];

    if (videoGameTiles.includes(playerPosition.toString()) && playerDirection === DirectionEnum.north) {
      dispatch(setPlayerCanInteract(true));
      dispatch(setModalHead("Falling Block Game"));
      dispatch(setModalName("FallingBlockGameModalContents"));
    }
  };

  switch (playerDirection) {
    case DirectionEnum.north:
      tileValue = showPlayerAnimationFrame ? TileMap.get("playerNorthMove") : TileMap.get("playerNorth");
      break;
    case DirectionEnum.east:
      tileValue = showPlayerAnimationFrame ? TileMap.get("playerEastMove") : TileMap.get("playerEast");
      break;
    case DirectionEnum.south:
      tileValue = showPlayerAnimationFrame ? TileMap.get("playerSouthMove") : TileMap.get("playerSouth");
      break;
    case DirectionEnum.west:
      tileValue = showPlayerAnimationFrame ? TileMap.get("playerWestMove") : TileMap.get("playerWest");
      break;
  }

  useEffect(() => {
    if (_playerMoveTimeout !== undefined) clearTimeout(_playerMoveTimeout.current);

    playerMove();
  }, [playerIsMoving, playerTick, modalIsVisible]);

  useEffect(() => {
    var body = document.getElementsByTagName("body")[0];
    body.setAttribute("data-player-inside", playerIsInside.toString());
  }, [playerIsInside]);

  return (
    <>
      {playerCanInteract ? (
        <div id="playerAlert">
          <div id="playerAlertA"></div>
        </div>
      ) : (
        ""
      )}
      <div id="player" data-tile={getKeyByValue(TileMap, tileValue)}></div>
    </>
  );
}
