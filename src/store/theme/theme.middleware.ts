import { createPersistenceMiddleware } from "@/store/utils/createPersistenceMiddleware";
import type { RootState } from "@/store";
import { themeStorage } from "./theme.storage";
import { toggleTheme } from "./theme.slice";

export const themeMiddleware = createPersistenceMiddleware<
  RootState,
  { theme: string }
>({
  sliceSelector: (state) => state.theme,
  storage: themeStorage,
  actions: [toggleTheme],
});
