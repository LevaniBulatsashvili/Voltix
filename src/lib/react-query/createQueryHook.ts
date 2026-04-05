import { useQuery } from "@tanstack/react-query";

export const createQueryHook = <TData, TOptions>(
  queryKeyFn: (options: TOptions) => readonly unknown[],
  queryFn: (options: TOptions) => Promise<TData>,
) => {
  return (options: TOptions) => {
    return useQuery<TData>({
      queryKey: queryKeyFn(options),
      queryFn: () => queryFn(options),
    });
  };
};
