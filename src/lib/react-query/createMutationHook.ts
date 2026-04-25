import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notify } from "../toast/toast";

interface MutationMessages {
  loading: string;
  success: string;
  error?: string;
}

interface CreateMutationHookOptions<TVariables, TData> {
  mutationFn: (variables: TVariables) => Promise<TData>;
  queryKey?: (variables: TVariables, data: TData) => unknown[];
  invalidateKey?: unknown[];
  isDelete?: boolean;
  messages?: MutationMessages;
}

export const createMutationHook = <TVariables, TData>({
  mutationFn,
  queryKey,
  invalidateKey,
  isDelete,
  messages,
}: CreateMutationHookOptions<TVariables, TData>) => {
  return () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (variables: TVariables) => {
        const promise = mutationFn(variables);
        if (messages) notify.promise(promise, messages);
        return promise;
      },
      onSuccess: (data, variables) => {
        if (invalidateKey)
          queryClient.invalidateQueries({ queryKey: invalidateKey });
        if (isDelete && queryKey)
          queryClient.removeQueries({ queryKey: queryKey(variables, data) });
        else if (queryKey)
          queryClient.setQueryData(queryKey(variables, data), data);
      },
    });
  };
};
