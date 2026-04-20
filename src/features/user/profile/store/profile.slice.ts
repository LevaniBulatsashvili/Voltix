import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IProfile } from "@/types/profile/profile";
import { profileStorage } from "./profile.storage";

export interface ProfileState {
  profile: IProfile | undefined;
  loading: boolean;
  error?: string;
}

const persisted = profileStorage.get();

const initialState: ProfileState = {
  profile: persisted?.profile ?? undefined,
  loading: !persisted?.profile,
  error: undefined,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<IProfile | undefined>) {
      state.profile = action.payload;
      state.loading = false;
      state.error = undefined;
    },
    clearProfile(state) {
      state.profile = undefined;
      state.error = undefined;
    },
    setProfileLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setProfileError(state, action: PayloadAction<string | undefined>) {
      state.error = action.payload;
    },
  },
});

export const { setProfile, clearProfile, setProfileLoading, setProfileError } =
  profileSlice.actions;

export default profileSlice.reducer;
