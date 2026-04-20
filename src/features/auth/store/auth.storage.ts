import { createStorage } from "@/utils/storageHelper";
import type { IAuthState } from "./auth.slice";

export const authStorage = createStorage<Pick<IAuthState, "user">>("auth", {
  user: null,
});
