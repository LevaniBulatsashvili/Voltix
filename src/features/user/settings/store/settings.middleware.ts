import { createPersistenceMiddleware } from "../../../../store/utils/createPersistenceMiddleware";
import { settingsStorage } from "./settings.storage";
import { setSettings, toggleSetting } from "./settings.slice";
import type { RootState } from "../../../../store";
import type { ISettings } from "./settings.slice";

export const settingsMiddleware = createPersistenceMiddleware<
  RootState,
  Partial<ISettings>
>({
  sliceSelector: (state) => state.settings,
  storage: settingsStorage,
  actions: [setSettings, toggleSetting],
});
