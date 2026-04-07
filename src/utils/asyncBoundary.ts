import type { IAsyncBoundaryMeta } from "../components/feedback/AsyncBoundary";
import type { RootState } from "../store";
import type { IDataResponse } from "../types/common/api";

type TAsyncState = "loading" | "error" | "empty" | "success";

export function resolveAsyncState({
  isLoading,
  error,
  isEmpty,
  flicker,
  settings,
}: {
  isLoading: boolean;
  error: Error | null;
  isEmpty: boolean;
  flicker: string | null;
  settings: RootState["settings"];
}): TAsyncState {
  if (settings.permaLoadingState || isLoading || flicker === "loading")
    return "loading";

  if (settings.permaErrorState || error || flicker === "error") return "error";

  if (settings.permaNoDataState || isEmpty || flicker === "empty")
    return "empty";

  return "success";
}

export function normalizeResponse<T>(response?: T | IDataResponse<T>): {
  items: T[];
  meta: IAsyncBoundaryMeta;
} {
  if (!response) return { items: [], meta: {} };

  if ("data" in (response as IDataResponse<T>)) {
    const r = response as IDataResponse<T> & {
      page?: number;
      limit?: number;
      hasMore?: boolean;
    };

    const hasMore =
      r.hasMore ??
      (r.page && r.limit ? r.page * r.limit < (r.total ?? 0) : undefined);

    return {
      items: r.data ?? [],
      meta: {
        total: r.total,
        page: r.page,
        limit: r.limit,
        hasMore,
      },
    };
  }

  return {
    items: [response as T],
    meta: {
      total: 1,
      page: 1,
      limit: 1,
      hasMore: false,
    },
  };
}
