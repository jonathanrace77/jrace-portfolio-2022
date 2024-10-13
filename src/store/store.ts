import { configureStore } from "@reduxjs/toolkit";
import inputReducer from "../features/island/inputSlice";
import mapReducer from "../features/island/mapSlice";
import modalReducer from "../features/site/modalSlice";
import playerReducer from "../features/island/playerSlice";

export const store = configureStore({
  reducer: {
    inputReducer: inputReducer,
    mapReducer: mapReducer,
    modalReducer: modalReducer,
    playerReducer: playerReducer,
  },
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
