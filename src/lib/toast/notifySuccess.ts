import { store } from "@/store";
import { addNotification } from "@/store/notification/notification.slice";

export const notifySuccess = (message: string) => {
  store.dispatch(
    addNotification({
      id: crypto.randomUUID(),
      type: "success",
      message,
    }),
  );
};
