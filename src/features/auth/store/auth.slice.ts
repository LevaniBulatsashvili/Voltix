import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IAuthUser } from "@/types/auth/auth";
import type { Session } from "@supabase/supabase-js";
import { authStorage } from "./auth.storage";

interface IAuthState {
  user: IAuthUser | null;
  session: Session | null;
  isLoading: boolean;
}

const persisted = authStorage.get();

const initialState: IAuthState = {
  user: persisted?.user ?? null,
  session: null,
  isLoading: !persisted?.user,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IAuthUser | null>) {
      state.user = action.payload;
      state.isLoading = false;
    },
    setSession(state, action: PayloadAction<Session | null>) {
      state.session = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    logout(state) {
      state.user = null;
      state.session = null;
      state.isLoading = false;
    },
  },
});

export const { setUser, setSession, setLoading, logout } = authSlice.actions;
export default authSlice.reducer;
export type { IAuthState };
