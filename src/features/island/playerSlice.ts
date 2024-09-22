import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

// Define a type for the slice state
export interface PlayerState {
  playerIsMoving: boolean;
}

// Define the initial state using that type
const initialState: PlayerState = {
  playerIsMoving: false,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayerIsMoving: (state, action: PayloadAction<boolean>) => {
      state.playerIsMoving = action.payload;
    },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

// Action creators are generated for each case reducer function
export const { setPlayerIsMoving } = playerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectPlayerIsMoving = (state: RootState) => state.playerReducer.playerIsMoving;

export default playerSlice.reducer;
