import { createStorage } from "@/utils/storageHelper";
import type { ProfileState } from "./profile.slice";

export const profileStorage = createStorage<Pick<ProfileState, "profile">>(
  "profile",
  {
    profile: undefined,
  },
);
