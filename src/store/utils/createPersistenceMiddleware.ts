import { isAnyOf, type Middleware } from "@reduxjs/toolkit";
import { notifyError } from "@/lib/toast/notifyError";

export function createPersistenceMiddleware<
  RootState,
  SliceState,
  PersistedState = SliceState,
>({
  sliceSelector,
  persistSelector,
  storage,
  actions,
}: {
  sliceSelector: (state: RootState) => SliceState;
  persistSelector?: (state: SliceState) => PersistedState;
  storage: {
    get: () => PersistedState | null;
    set: (value: PersistedState) => void;
  };
  actions: Parameters<typeof isAnyOf>;
}): Middleware<unknown, RootState> {
  const isWatchedAction = isAnyOf(...actions);

  return (store) => (next) => (action) => {
    const result = next(action);

    if (isWatchedAction(action)) {
      try {
        const sliceState = sliceSelector(store.getState());
        const stateToPersist = persistSelector
          ? persistSelector(sliceState)
          : (sliceState as unknown as PersistedState);
        storage.set(stateToPersist);
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        notifyError(`persist.${message}`);
      }
    }

    return result;
  };
}
