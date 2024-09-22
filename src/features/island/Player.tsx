import DirectionEnum from "../../enums/DirectionEnum";
import TileMapEnum from "../../enums/TileMapEnum";
import { getKeyByValue } from "../../scripts/Utils";

export default function Player({
  playerCanInteract,
  playerDirection,
  showPlayerAnimationFrame,
}: {
  playerCanInteract: boolean;
  playerDirection: number;
  showPlayerAnimationFrame: boolean;
}) {
  let tileValue;

  switch (playerDirection) {
    case DirectionEnum.north:
      tileValue = showPlayerAnimationFrame ? TileMapEnum.playerNorthMove : TileMapEnum.playerNorth;
      break;
    case DirectionEnum.east:
      tileValue = showPlayerAnimationFrame ? TileMapEnum.playerEastMove : TileMapEnum.playerEast;
      break;
    case DirectionEnum.south:
      tileValue = showPlayerAnimationFrame ? TileMapEnum.playerSouthMove : TileMapEnum.playerSouth;
      break;
    case DirectionEnum.west:
      tileValue = showPlayerAnimationFrame ? TileMapEnum.playerWestMove : TileMapEnum.playerWest;
      break;
  }

  let tile = getKeyByValue(TileMapEnum, tileValue);

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
