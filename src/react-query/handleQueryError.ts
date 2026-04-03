import type { Query, Mutation } from "@tanstack/react-query";
import { store } from "../store";
import { addNotification } from "../store/notification/notification.slice";
import { extractErrorMessage } from "../utils/error";

type TQuery = Query<unknown, unknown, unknown, readonly unknown[]>;
type TMutation = Mutation<unknown, unknown, unknown, unknown>;

export const handleQueryError = (
  error: unknown,
  query?: TQuery,
  mutation?: TMutation,
) => {
  const meta = query?.meta ?? mutation?.meta;
  if (meta?.disableGlobalError) return;

  store.dispatch(
    addNotification({
      id: crypto.randomUUID(),
      type: "error",
      message: `errors.${extractErrorMessage(error)}`,
    }),
  );
};
