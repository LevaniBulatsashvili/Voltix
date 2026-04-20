import { createPersistenceMiddleware } from "@/store/utils/createPersistenceMiddleware";
import type { RootState } from "@/store";
import type { ProfileState } from "./profile.slice";
import { profileStorage } from "./profile.storage";
import { setProfile, clearProfile } from "./profile.slice";

export const profileMiddleware = createPersistenceMiddleware<
  RootState,
  ProfileState,
  Pick<ProfileState, "profile">
>({
  sliceSelector: (state) => state.profile,
  persistSelector: (profile) => ({
    profile: profile.profile,
  }),
  storage: profileStorage,
  actions: [setProfile, clearProfile],
});
