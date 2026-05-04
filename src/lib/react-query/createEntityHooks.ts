import { createInfiniteQueryHook } from "@/lib/react-query/createInfiniteQueryHook";
import { createMutationHook } from "@/lib/react-query/createMutationHook";
import { createQueryHook } from "@/lib/react-query/createQueryHook";
import type {
  IFetchManyOptions,
  IFilters,
} from "@/lib/supabase/createSupabaseService";
import type {
  IDataResponse,
  ICreatePayload,
  IUpdatePayload,
} from "@/types/common/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const createEntityHooks = <
  T extends { id: IDType },
  IDType extends string | number,
  TCreate extends Record<string, unknown> = ICreatePayload<T>,
  FetchManyOpts extends IFetchManyOptions<T> = IFetchManyOptions<T>,
>(
  service: {
    fetch: (id: IDType) => Promise<T>;
    fetchMany: (options?: FetchManyOpts) => Promise<IDataResponse<T>>;
    infiniteFetch: (options: FetchManyOpts) => Promise<IDataResponse<T>>;
    createMany: (payload: TCreate[]) => Promise<T[]>;
    create: (payload: TCreate) => Promise<T>;
    update: (payload: IUpdatePayload<T>) => Promise<T>;
    deleteMany: (filters: IFilters<T>) => Promise<void>;
    delete: (id: IDType) => Promise<void>;
  },
  queryKeyPrefix: string,
  entityName: string,
) => {
  const messages = {
    create: {
      loading: "common.mutation.creating",
      success: "common.mutation.created",
      params: { entity: entityName },
    },
    update: {
      loading: "common.mutation.updating",
      success: "common.mutation.updated",
      params: { entity: entityName },
    },
    delete: {
      loading: "common.mutation.deleting",
      success: "common.mutation.deleted",
      params: { entity: entityName },
    },
  };

  const useFetch = createQueryHook(
    (id: IDType) => [queryKeyPrefix, id],
    service.fetch,
  );

  const useFetchMany = (options?: FetchManyOpts, enabled: boolean = true) =>
    createQueryHook(
      (opts?: FetchManyOpts) => [queryKeyPrefix, opts],
      service.fetchMany,
    )(options, enabled);

  const fetchManyOptions = (
    options?: FetchManyOpts,
    enabled: boolean = true,
  ) => ({
    queryKey: [queryKeyPrefix, options] as const,
    queryFn: () => service.fetchMany(options),
    enabled,
  });

  const useInfiniteFetchMany = createInfiniteQueryHook<T, FetchManyOpts>(
    (options) => [queryKeyPrefix, options],
    (optionsWithPage) => service.infiniteFetch(optionsWithPage),
  );

  const useCreateMany = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (payload: TCreate[]) => service.createMany(payload),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [queryKeyPrefix] });
      },
    });
  };

  const useCreate = createMutationHook({
    mutationFn: (payload: TCreate) => service.create(payload),
    queryKey: (_: TCreate, data: T) => [queryKeyPrefix, data.id],
    invalidateKey: [queryKeyPrefix],
    messages: messages.create,
  });

  const useUpdate = createMutationHook({
    mutationFn: service.update,
    queryKey: (_: IUpdatePayload<T>, data: T) => [queryKeyPrefix, data.id],
    invalidateKey: [queryKeyPrefix],
    messages: messages.update,
  });

  const useDeleteMany = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (filters: IFilters<T>) => service.deleteMany(filters),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [queryKeyPrefix] });
      },
    });
  };

  const useDelete = createMutationHook({
    mutationFn: service.delete,
    queryKey: (id: IDType) => [queryKeyPrefix, id],
    invalidateKey: [queryKeyPrefix],
    isDelete: true,
    messages: messages.delete,
  });

  return {
    useFetch,
    useFetchMany,
    fetchManyOptions,
    useInfiniteFetchMany,
    useCreateMany,
    useCreate,
    useUpdate,
    useDeleteMany,
    useDelete,
  };
};
