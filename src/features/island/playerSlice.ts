import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import DirectionEnum from "../../enums/Direction.enum";
import { RootState } from "../../store/store";

// Define a type for the slice state
export interface PlayerState {
  playerCanInteract: boolean;
  playerIsMoving: boolean;
  playerDirection: DirectionEnum;
  showPlayerAnimationFrame: boolean;
}

// Define the initial state using that type
const initialState: PlayerState = {
  playerCanInteract: false,
  playerIsMoving: false,
  playerDirection: DirectionEnum.west,
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
    setShowPlayerAnimationFrame: (state, action: PayloadAction<boolean>) => {
      state.showPlayerAnimationFrame = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPlayerCanInteract, setPlayerIsMoving, setPlayerDirecton, setShowPlayerAnimationFrame } = playerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectPlayerIsMoving = (state: RootState) => state.playerReducer.playerIsMoving;

export default playerSlice.reducer;
