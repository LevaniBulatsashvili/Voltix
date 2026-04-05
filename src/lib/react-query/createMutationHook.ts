import { useMutation, useQueryClient } from "@tanstack/react-query";

interface IUseMutationStatic<TInput, TOutput, TKey> {
  mutationFn: (input: TInput) => Promise<TOutput>;
  queryKey: TKey;
  isDelete?: boolean;
}

interface IUseMutationDynamic<TInput, TOutput, TKey> {
  mutationFn: (input: TInput) => Promise<TOutput>;
  queryKey: (input: TInput, result: TOutput) => TKey;
  isDelete?: boolean;
}

type IUseMutationOptions<TInput, TOutput, TKey> =
  | IUseMutationStatic<TInput, TOutput, TKey>
  | IUseMutationDynamic<TInput, TOutput, TKey>;

export const createMutationHook = <
  TInput,
  TOutput,
  TKey extends readonly unknown[],
  TCache = TOutput,
>({
  mutationFn,
  queryKey,
  isDelete = false,
}: IUseMutationOptions<TInput, TOutput, TKey>) => {
  return () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn,

      onSuccess: (data: TOutput, input: TInput) => {
        const key: TKey =
          typeof queryKey === "function" ? queryKey(input, data) : queryKey;

        if (isDelete) queryClient.removeQueries({ queryKey: key });
        else queryClient.setQueryData<TCache>(key, data as unknown as TCache);
      },
    });
  };
};
