import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme/theme.slice";
import notificationReducer from "./notification/notification.slice";
import authReducer from "../features/auth/store/auth.slice";
import userReducer from "../features/user/store/user.slice";

const rootReducer = combineReducers({
  theme: themeReducer,
  notification: notificationReducer,
  auth: authReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
