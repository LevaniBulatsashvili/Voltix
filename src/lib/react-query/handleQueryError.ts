import type { Query, Mutation } from "@tanstack/react-query";
import { store } from "@/store";
import { addNotification } from "@/store/notification/notification.slice";
import { extractErrorMessage } from "@/utils/error";
import { parseServiceError } from "../supabase/parseServiceError";
import i18next from "i18next";

type TQuery = Query<unknown, unknown, unknown, readonly unknown[]>;
type TMutation = Mutation<unknown, unknown, unknown, unknown>;

export const handleQueryError = (
  error: unknown,
  query?: TQuery,
  mutation?: TMutation,
) => {
  const meta = query?.meta ?? mutation?.meta;
  if (meta?.disableGlobalError) return;

  const message = parseServiceError(
    extractErrorMessage(error),
    i18next.t.bind(i18next),
  );

  store.dispatch(
    addNotification({
      id: crypto.randomUUID(),
      type: "error",
      message,
    }),
  );
};
