import { createSlice } from "@reduxjs/toolkit";
import { type RootState } from "../";

interface IThemeState {
  theme: string;
}

const initialState: IThemeState = {
  theme: localStorage.getItem("theme") ?? "dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", state.theme);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export const themeSelector = (state: RootState) => state.theme;
export default themeSlice.reducer;
