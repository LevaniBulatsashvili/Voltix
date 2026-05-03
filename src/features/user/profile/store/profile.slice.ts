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
  profile: persisted?.profile,
  loading: !persisted?.profile,
  error: undefined,
};

const isProfileEqual = (prev: IProfile, next: IProfile): boolean => {
  for (const key of Object.keys(next) as (keyof IProfile)[]) {
    const prevVal = prev[key];
    const nextVal = next[key];

    const bothArrays = Array.isArray(prevVal) && Array.isArray(nextVal);
    if (bothArrays && JSON.stringify(prevVal) !== JSON.stringify(nextVal))
      return false;
    if (!bothArrays && prevVal !== nextVal) return false;
  }

  return true;
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<IProfile | undefined>) {
      if (
        state.profile &&
        action.payload &&
        isProfileEqual(state.profile, action.payload)
      )
        return;

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
