import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { settingsStorage } from "./settings.storage";

export interface ISettings {
  permaNoDataState: boolean;
  permaLoadingState: boolean;
  permaErrorState: boolean;
  flickerNoDataState: boolean;
  flickerLoadingState: boolean;
  flickerErrorState: boolean;
}

const initialState: ISettings = {
  permaNoDataState: false,
  permaLoadingState: false,
  permaErrorState: false,
  flickerNoDataState: false,
  flickerLoadingState: false,
  flickerErrorState: false,
  ...settingsStorage.get(),
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<Partial<ISettings>>) => {
      Object.assign(state, action.payload);
    },

    resetSettings: () => initialState,

    toggleSetting: (state, action: PayloadAction<keyof ISettings>) => {
      const key = action.payload;
      state[key] = !state[key];
    },
  },
});

export const { setSettings, resetSettings, toggleSetting } =
  settingsSlice.actions;

export default settingsSlice.reducer;
