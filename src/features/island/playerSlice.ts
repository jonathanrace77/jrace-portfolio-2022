import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import DirectionEnum from "../../enums/Direction.enum";
import { RootState } from "../../store/store";

// Define a type for the slice state
export interface PlayerState {
  playerCanInteract: boolean;
  playerIsMoving: boolean;
  playerIsInside: boolean;
  playerDirection: DirectionEnum;
  playerDirectionToMove: DirectionEnum | null;
  playerPosition: number[];
  playerTick: number;
  showPlayerAnimationFrame: boolean;
}

// Define the initial state using that type
const initialState: PlayerState = {
  playerCanInteract: false,
  playerIsMoving: false,
  playerIsInside: false,
  playerDirection: DirectionEnum.west,
  playerDirectionToMove: null,
  playerPosition: [18, 12],
  playerTick: 0,
  showPlayerAnimationFrame: false,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayerCanInteract: (state, action: PayloadAction<boolean>) => {
      state.playerCanInteract = action.payload;
    },
    setPlayerIsMoving: (state, action: PayloadAction<boolean>) => {
      state.playerIsMoving = action.payload;
    },
    setPlayerDirecton: (state, action: PayloadAction<DirectionEnum>) => {
      state.playerDirection = action.payload;
    },
    setPlayerDirectionToMove: (state, action: PayloadAction<DirectionEnum | null>) => {
      state.playerDirectionToMove = action.payload;
    },
    setPlayerIsInside: (state, action: PayloadAction<boolean>) => {
      state.playerIsInside = action.payload;
    },
    setPlayerPosition: (state, action: PayloadAction<number[]>) => {
      state.playerPosition = action.payload;
    },
    setPlayerPositionMoveEast: (state) => {
      state.playerPosition = [state.playerPosition[0] + 1, state.playerPosition[1]];
    },
    setPlayerPositionMoveSouth: (state) => {
      state.playerPosition = [state.playerPosition[0], state.playerPosition[1] + 1];
    },
    setPlayerPositionMoveWest: (state) => {
      state.playerPosition = [state.playerPosition[0] - 1, state.playerPosition[1]];
    },
    setPlayerPositionMoveNorth: (state) => {
      state.playerPosition = [state.playerPosition[0], state.playerPosition[1] - 1];
    },
    setShowPlayerAnimationFrame: (state, action: PayloadAction<boolean>) => {
      state.showPlayerAnimationFrame = action.payload;
    },
    updatePlayerTick: (state) => {
      state.playerTick++;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setPlayerCanInteract,
  setPlayerIsMoving,
  setPlayerDirecton,
  setPlayerDirectionToMove,
  setPlayerIsInside,
  setPlayerPosition,
  setPlayerPositionMoveEast,
  setPlayerPositionMoveSouth,
  setPlayerPositionMoveWest,
  setPlayerPositionMoveNorth,
  setShowPlayerAnimationFrame,
  updatePlayerTick,
} = playerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectPlayerIsMoving = (state: RootState) => state.playerReducer.playerIsMoving;

export default playerSlice.reducer;
