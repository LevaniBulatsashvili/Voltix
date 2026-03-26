import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme/theme.slice";
import notificationReducer from "./notification/notification.slice";
import authReducer from "../features/auth/store/auth.slice";
import profileReducer from "../features/user/profile/store/profile.slice";
import cartReducer from "../features/user/cart/store/cart.slice";
import { cartMiddleware } from "../features/user/cart/store/cart.middleware";

const rootReducer = combineReducers({
  theme: themeReducer,
  notification: notificationReducer,
  auth: authReducer,
  profile: profileReducer,
  cart: cartReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartMiddleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
