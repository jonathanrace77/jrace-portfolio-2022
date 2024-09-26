import DirectionEnum from "../../enums/Direction.enum";
import TileMap from "../../maps/TileMap";
import { getKeyByValue } from "../../scripts/Utils";
import { useAppSelector } from "../../store/hooks";

export default function Player() {
  const playerCanInteract = useAppSelector((state) => state.playerReducer.playerCanInteract);
  const playerDirection = useAppSelector((state) => state.playerReducer.playerDirection);
  const showPlayerAnimationFrame = useAppSelector((state) => state.playerReducer.showPlayerAnimationFrame);

  let tileValue;

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

  let tile = getKeyByValue(TileMap, tileValue);

  let playerAlert = playerCanInteract ? (
    <div id="playerAlert">
      <div id="playerAlertA"></div>
    </div>
  ) : (
    ""
  );
  return (
    <>
      {playerAlert}
      <div id="player" data-tile={tile}></div>
    </>
  );
}
