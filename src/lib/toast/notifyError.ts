import { store } from "../../store";
import { addNotification } from "../../store/notification/notification.slice";
import { getErrorKey } from "../errors/getErrorKey";

export const notifyError = (error: unknown, customErr?: boolean) => {
  store.dispatch(
    addNotification({
      id: crypto.randomUUID(),
      type: "error",
      message: `errors.${customErr ? error : getErrorKey(error)}`,
    }),
  );
};
