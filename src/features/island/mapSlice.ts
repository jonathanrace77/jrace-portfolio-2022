import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { _tileWidth, _tileHeight } from "../../scripts/Constants";
import { overWorldMap } from "../../maps/overworldMap";

// Define a type for the slice state
export interface MapState {
  mapPosition: number[];
  mapSizeByTile: number[];
  tileMap: number[][][];
  worldMapStyle: { top: string; left: string; width: string };
}

// Define the initial state using that type
const initialState: MapState = {
  mapPosition: [0, 0],
  mapSizeByTile: [37, 25],
  tileMap: overWorldMap,
  worldMapStyle: {
    top: `calc(50% + 0px - ((12.5 * 64px)))`,
    left: `calc(50% + 0px - ((18.5 * 64px)))`,
    width: `calc((64 / 16) * 37em)`,
  },
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setMapPosition: (state, action: PayloadAction<number[]>) => {
      state.mapPosition = action.payload;
      state.worldMapStyle = {
        top: `calc(50% + ${action.payload[1]}px - ((${Math.round(state.mapSizeByTile[1]) / 2} * ${_tileHeight}px)))`,
        left: `calc(50% + ${action.payload[0]}px - ((${Math.round(state.mapSizeByTile[0]) / 2} * ${_tileWidth}px)))`,
        width: `calc((${_tileWidth} / 16) * ${state.mapSizeByTile[0]}em)`,
      };
    },
    setMapSizeByTile: (state, action: PayloadAction<number[]>) => {
      state.mapSizeByTile = action.payload;
    },
    setTileMap: (state, action: PayloadAction<number[][][]>) => {
      state.tileMap = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMapPosition, setMapSizeByTile, setTileMap } = mapSlice.actions;

export default mapSlice.reducer;
