import { createInfiniteQueryHook } from "@/lib/react-query/createInfiniteQueryHook";
import { createMutationHook } from "@/lib/react-query/createMutationHook";
import { createQueryHook } from "@/lib/react-query/createQueryHook";
import type { IFetchManyOptions } from "@/lib/supabase/createSupabaseService";
import type {
  IDataResponse,
  ICreatePayload,
  IUpdatePayload,
} from "@/types/common/api";

export const createEntityHooks = <
  T extends { id: IDType },
  IDType extends string | number,
  FetchManyOpts extends IFetchManyOptions<T> = IFetchManyOptions<T>,
>(
  service: {
    fetch: (id: IDType) => Promise<T>;
    fetchMany: (options?: FetchManyOpts) => Promise<IDataResponse<T>>;
    infiniteFetch: (options: FetchManyOpts) => Promise<IDataResponse<T>>;
    create: (payload: ICreatePayload<T>) => Promise<T>;
    update: (payload: IUpdatePayload<T>) => Promise<T>;
    delete: (id: IDType) => Promise<void>;
  },
  queryKeyPrefix: string,
) => {
  const useFetch = createQueryHook(
    (id: IDType) => [queryKeyPrefix, id],
    service.fetch,
  );

  const useFetchMany = (options?: FetchManyOpts, enabled: boolean = true) =>
    createQueryHook(
      (opts?: FetchManyOpts) => [queryKeyPrefix, opts],
      service.fetchMany,
    )(options, enabled);

  const useInfiniteFetchMany = createInfiniteQueryHook<T, FetchManyOpts>(
    (options) => [queryKeyPrefix, options],
    (optionsWithPage) => service.infiniteFetch(optionsWithPage),
  );

  const useCreate = createMutationHook({
    mutationFn: service.create,
    queryKey: (_: ICreatePayload<T>, data: T) => [queryKeyPrefix, data.id],
    invalidateKey: [queryKeyPrefix],
  });

  const useUpdate = createMutationHook({
    mutationFn: service.update,
    queryKey: (_: IUpdatePayload<T>, data: T) => [queryKeyPrefix, data.id],
    invalidateKey: [queryKeyPrefix],
  });

  const useDelete = createMutationHook({
    mutationFn: service.delete,
    queryKey: (id: IDType) => [queryKeyPrefix, id],
    invalidateKey: [queryKeyPrefix],
    isDelete: true,
  });

  return {
    useFetch,
    useFetchMany,
    useInfiniteFetchMany,
    useCreate,
    useUpdate,
    useDelete,
  };
};
