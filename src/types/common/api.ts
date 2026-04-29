export interface IPaginationOptions {
  page?: number;
  limit?: number;
}

export interface IDataResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface IInfiniteQueryResponse<T> {
  pages: IDataResponse<T>[];
  pageParams: number[];
}

export type ICreatePayload<T> = Omit<T, "id" | "created_at" | "updated_at">;
export type IUpdatePayload<T> = Partial<
  Omit<T, "created_at" | "updated_at">
> & {
  id: string | number;
};
