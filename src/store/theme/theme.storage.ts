import { createStorage } from "@/utils/storageHelper";

export const themeStorage = createStorage<{ theme: string }>("theme", {
  theme: "light",
});
