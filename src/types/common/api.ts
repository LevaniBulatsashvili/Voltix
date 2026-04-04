export interface IPaginationOptions {
  page?: number;
  limit?: number;
}

export interface IDataResponse<T> {
  data: T[];
  total: number;
}
