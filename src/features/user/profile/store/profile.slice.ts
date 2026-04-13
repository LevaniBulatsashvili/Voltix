import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IProfile } from "@/types/profile";

interface ProfileState {
  profile: IProfile | null;
  loading: boolean;
  error?: string;
}

const initialState: ProfileState = {
  profile: null,
  loading: false,
  error: undefined,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<IProfile>) => {
      state.profile = action.payload;
      state.error = undefined;
    },
    clearProfile: (state) => {
      state.profile = null;
      state.error = undefined;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setProfile, clearProfile, setLoading, setError } =
  profileSlice.actions;
export default profileSlice.reducer;
