import { QueryClient, QueryCache } from "@tanstack/react-query";
import { store } from "../store";
import { addNotification } from "../store/notification/notification.slice";
import { getErrorKey } from "../lib/errors/getErrorKey";

export const client = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      store.dispatch(
        addNotification({
          id: crypto.randomUUID(),
          type: "error",
          messageKey: `errors.${getErrorKey(error)}`,
        }),
      );
    },
  }),
  defaultOptions: {
    mutations: {
      onError: (error: unknown) => {
        store.dispatch(
          addNotification({
            id: crypto.randomUUID(),
            type: "error",
            messageKey: `errors.${getErrorKey(error)}`,
          }),
        );
      },
    },
  },
});
