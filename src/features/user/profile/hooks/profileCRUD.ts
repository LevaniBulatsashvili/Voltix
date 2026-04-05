import { createMutationHook } from "../../../../lib/react-query/createMutationHook";
import { createQueryHook } from "../../../../lib/react-query/createQueryHook";
import { Query_Keys } from "../../../../lib/react-query/configs";
import { profileService } from "../service/profileService";
import type {
  ICreatePayload,
  IUpdatePayload,
} from "../../../../types/common/api";
import type { IProfile } from "../../../../types/profile";

export const useFetchProfile = createQueryHook(
  (id) => [Query_Keys.profile, id],
  profileService.fetch,
);

export const useCreateProfile = createMutationHook({
  mutationFn: profileService.create,
  queryKey: (
    _: Omit<ICreatePayload<IProfile>, "created_at" | "addresses">,
    data,
  ) => [Query_Keys.profile, data.id],
});

export const useUpdateProfile = createMutationHook({
  mutationFn: profileService.update,
  queryKey: (_: IUpdatePayload<IProfile>, data) => [
    Query_Keys.profile,
    data.id,
  ],
});

export const useDeleteProfile = createMutationHook({
  mutationFn: profileService.delete,
  queryKey: (id) => [Query_Keys.profile, id],
  isDelete: true,
});
