import { getKeyByValue } from "../scripts/Utils";
import TileMapEnum from "../enums/TileMapEnum";
import { overWorldMap } from "../maps/overworldMap";
import { useMemo } from "react";

export default function WorldMap({ tileMap }) {
  const getWorldMap = () => {
    let worldMap = [];
    let tileIteration = 0;

    for (let row = 0; row < tileMap.length; row++) {
      for (let col = 0; col < tileMap[0].length; col++) {
        let tile = getKeyByValue(TileMapEnum, tileMap[row][col][0]);

        worldMap[tileIteration] = <div className="map-tile" data-position={col + "," + row} data-tile={tile} key={tileIteration}></div>;
        tileIteration++;
      }
    }

    document.body.style.backgroundColor = "black";

    if (tileMap === overWorldMap) document.body.style.backgroundColor = "var(--body-background)";

    return worldMap;
  };

  return useMemo(() => getWorldMap(tileMap), [tileMap]);
}
