import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { KeysPressed } from "../../interfaces/keys-pressed.interface.js";
import { _tileWidth, _tileHeight } from "../../scripts/Constants.js";

// Define a type for the slice state
export interface InputState {
  keyPressed: string;
  keyReleased: string;
  keysPressed: KeysPressed;
}

// Define the initial state using that type
const initialState: InputState = {
  keyPressed: "",
  keyReleased: "",
  keysPressed: { north: false, east: false, south: false, west: false },
};

const inputSlice = createSlice({
  name: "input",
  initialState,
  reducers: {
    setKeyPressed: (state, action: PayloadAction<string>) => {
      state.keyReleased = "";
      state.keyPressed = action.payload;
    },
    setKeyReleased: (state, action: PayloadAction<string>) => {
      state.keyPressed = "";
      state.keyReleased = action.payload;
    },
    setKeysPressed: (state, action: PayloadAction<KeysPressed>) => {
      state.keysPressed = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setKeyPressed, setKeyReleased, setKeysPressed } = inputSlice.actions;

export default inputSlice.reducer;
