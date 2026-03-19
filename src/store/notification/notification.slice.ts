import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type TNotificationType = "success" | "error" | "info" | "warning";

export interface INotification {
  id: string;
  type: TNotificationType;
  message: string;
}

interface INotificationState {
  queue: INotification[];
}

const initialState: INotificationState = {
  queue: [],
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<INotification>) => {
      state.queue.push(action.payload);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.queue = state.queue.filter((n) => n.id !== action.payload);
    },
    clearNotifications: (state) => {
      state.queue = [];
    },
  },
});

export const { addNotification, removeNotification, clearNotifications } =
  notificationSlice.actions;

export default notificationSlice.reducer;
