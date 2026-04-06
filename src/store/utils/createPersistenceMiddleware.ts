import { isAnyOf, type Middleware } from "@reduxjs/toolkit";
import { notifyError } from "../../lib/toast/notifyError";

export function createPersistenceMiddleware<RootState, SliceState>({
  sliceSelector,
  storage,
  actions,
}: {
  sliceSelector: (state: RootState) => SliceState;
  storage: { get: () => SliceState; set: (value: SliceState) => void };
  actions: Array<{ match: (action: unknown) => action is unknown }>;
}): Middleware<unknown, RootState> {
  const isWatchedAction = isAnyOf(...actions);

  return (store) => (next) => (action) => {
    const result = next(action);

    if (isWatchedAction(action)) {
      try {
        const sliceState = sliceSelector(store.getState());
        storage.set(sliceState);
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        notifyError(`persist.${message}`);
      }
    }

    return result;
  };
}
