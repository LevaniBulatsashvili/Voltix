import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme/theme.slice";
import notificationReducer from "./notification/notification.slice";
import authReducer from "@/features/auth/store/auth.slice";
import profileReducer from "@/features/user/profile/store/profile.slice";
import cartReducer from "@/features/user/cart/store/cart.slice";
import { cartMiddleware } from "@/features/user/cart/store/cart.middleware";
import settingsReducer from "@/features/user/settings/store/settings.slice";
import { settingsMiddleware } from "@/features/user/settings/store/settings.middleware";

const rootReducer = combineReducers({
  theme: themeReducer,
  notification: notificationReducer,
  auth: authReducer,
  profile: profileReducer,
  cart: cartReducer,
  settings: settingsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartMiddleware, settingsMiddleware),
  devTools: true,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
