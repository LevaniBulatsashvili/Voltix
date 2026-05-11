import { createSlice } from "@reduxjs/toolkit";
import { type RootState } from "../";
import { themeStorage } from "./theme.storage";

interface IThemeState {
  theme: string;
}

const initialState: IThemeState = {
  theme: themeStorage.get()?.theme ?? "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export const themeSelector = (state: RootState) => state.theme;
export default themeSlice.reducer;
