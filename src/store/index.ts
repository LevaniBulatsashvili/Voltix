import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme/theme.slice";
import authReducer from "../features/auth/store/auth.slice";

const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

export const store = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
  });

export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore["dispatch"];
