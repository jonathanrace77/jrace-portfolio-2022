import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
export interface ModalState {
  modalHead: string;
  modalIsVisible: boolean;
  modalName: string;
}

// Define the initial state using that type
const initialState: ModalState = {
  modalHead: "",
  modalIsVisible: false,
  modalName: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    hideModal: (state) => {
      state.modalHead = "";
      state.modalIsVisible = false;
      state.modalName = "";
    },
    setModalHead: (state, action: PayloadAction<string>) => {
      state.modalHead = action.payload;
    },
    setModalIsVisible: (state, action: PayloadAction<boolean>) => {
      state.modalIsVisible = action.payload;
    },
    setModalName: (state, action: PayloadAction<string>) => {
      state.modalName = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { hideModal, setModalHead, setModalName, setModalIsVisible } = modalSlice.actions;

export default modalSlice.reducer;
