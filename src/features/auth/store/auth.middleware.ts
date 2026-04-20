import { createPersistenceMiddleware } from "@/store/utils/createPersistenceMiddleware";
import { authStorage } from "./auth.storage";
import { setUser, logout } from "./auth.slice";
import type { IAuthState } from "./auth.slice";
import type { RootState } from "@/store";

export const authMiddleware = createPersistenceMiddleware<
  RootState,
  IAuthState,
  Pick<IAuthState, "user">
>({
  sliceSelector: (state) => state.auth,
  persistSelector: (auth) => ({ user: auth.user }),
  storage: authStorage,
  actions: [setUser, logout],
});
