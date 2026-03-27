import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IAuthUser } from "../../../types/auth";
import type { Session } from "@supabase/supabase-js";

interface IAuthState {
  user: IAuthUser | null;
  session: Session | null;
  isLoading: boolean;
}

const initialState: IAuthState = {
  user: null,
  session: null,
  isLoading: true,
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
