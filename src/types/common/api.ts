export interface IPaginationOptions {
  page?: number;
  limit?: number;
}

export interface IDataResponse<T> {
  data: T[];
  total: number;
}

export type ICreatePayload<T> = Omit<T, "id">;
export type IUpdatePayload<T> = Partial<T> & { id: string };
