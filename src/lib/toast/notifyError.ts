import { store } from "@/store";
import { addNotification } from "@/store/notification/notification.slice";
import { extractErrorMessage } from "@/utils/error";

export const notifyError = (error: unknown) => {
  store.dispatch(
    addNotification({
      id: crypto.randomUUID(),
      type: "error",
      message: `errors.${extractErrorMessage(error)}`,
    }),
  );
};
