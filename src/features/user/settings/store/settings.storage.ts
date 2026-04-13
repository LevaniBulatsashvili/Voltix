import { createStorage } from "@/utils/storageHelper";
import type { ISettings } from "./settings.slice";

export const settingsStorage = createStorage<Partial<ISettings>>(
  "settings",
  {},
);
