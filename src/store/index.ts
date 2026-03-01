import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme/theme.slice";

const rootReducer = combineReducers({
  theme: themeReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

export const store = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
  });

export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore["dispatch"];
