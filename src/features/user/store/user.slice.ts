import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { IUser } from "../../../types/User";
import { userService } from "../api/userService";

interface UserState {
  currentUser: IUser | null;
  loading: boolean;
  error?: string;
}

const initialState: UserState = {
  currentUser: null,
  loading: false,
};

export const fetchUser = createAsyncThunk("user/fetch", async () => {
  return await userService.getUser();
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
