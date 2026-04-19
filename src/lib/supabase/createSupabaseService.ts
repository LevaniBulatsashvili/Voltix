import { supabase } from ".";
import type { IDataResponse } from "@/types/common/api";
import { applyFilters } from "./applyFilters";

export type IFilters<T> = {
  eq?: Partial<T>;
  neq?: Partial<T>;
  gt?: Partial<Record<keyof T, number | string>>;
  gte?: Partial<Record<keyof T, number | string>>;
  lt?: Partial<Record<keyof T, number | string>>;
  lte?: Partial<Record<keyof T, number | string>>;
  like?: Partial<Record<keyof T, string>>;
  ilike?: Partial<Record<keyof T, string>>;
  in?: Partial<Record<keyof T, Array<T[keyof T]>>>;
};

export interface IFetchManyOptions<T> {
  page?: number;
  limit?: number;
  sort?: { field: keyof T; ascending?: boolean }[];
  count?: "exact" | "planned" | "estimated";
  filters?: IFilters<T>;
  selectField?: string;
}

export interface ISelectFieldOptions {
  fetchManySelectField?: string;
  fetchSelectField?: string;
  createSelectField?: string;
  updateSelectField?: string;
}

export interface ICrudServiceOptions<T> {
  table: string;
  keyField: keyof T;
  serviceName: string;
  selectFieldOptions?: ISelectFieldOptions;
}

export const createSupabaseService = <
  T,
  TCreate extends Record<string, unknown>,
  TUpdate,
  TKey = string | number,
>({
  table,
  keyField,
  serviceName,
  selectFieldOptions,
}: ICrudServiceOptions<T>) => {
  const keyFieldString = keyField as string;

  // --- Normal fetchMany ---
  async function fetchMany(
    options?: IFetchManyOptions<T>,
  ): Promise<IDataResponse<T>> {
    const {
      filters,
      limit = 9,
      page = 1,
      sort,
      count = "exact",
      selectField,
    } = options ?? {};
    const offset = (Math.max(page, 1) - 1) * limit;

    let query = supabase
      .from(table)
      .select(selectField ?? selectFieldOptions?.fetchManySelectField ?? "*", {
        count,
      });

    query = applyFilters<T>(query, filters);

    if (sort?.length)
      sort.forEach(({ field, ascending = true }) => {
        query = query.order(field as string, { ascending });
      });

    query = query.range(offset, offset + limit - 1);

    const { data, count: total, error } = await query;

    if (error) throw new Error(`failed_to_fetch_${serviceName}`);

    const safeData = (data ?? []) as T[];
    const safeTotal = total ?? 0;

    return {
      data: safeData,
      total: safeTotal,
      page,
      limit,
      hasMore: offset + safeData.length < safeTotal,
    };
  }

  // --- Infinite fetch ---
  async function infiniteFetch(
    options?: IFetchManyOptions<T>,
  ): Promise<IDataResponse<T>> {
    const result = await fetchMany(options);
    return result;
  }

  // --- Single fetch ---
  async function fetch(id: TKey): Promise<T> {
    const { data, error } = await supabase
      .from(table)
      .select(selectFieldOptions?.fetchSelectField ?? "*")
      .eq(keyFieldString, id)
      .single<T>();

    if (error) throw new Error(`failed_to_fetch_${serviceName}`);
    if (!data) throw new Error(`${serviceName}_not_available`);
    return data;
  }

  // --- Create Many ---
  async function createMany(items: TCreate[]): Promise<T[]> {
    const { data, error } = await supabase
      .from(table)
      .insert(items as unknown as Record<string, unknown>[])
      .select(selectFieldOptions?.createSelectField ?? "*");

    if (error) throw new Error(`failed_to_create_${serviceName}`);
    return (data ?? []) as T[];
  }

  // --- Create ---
  async function create(item: TCreate): Promise<T> {
    const { data, error } = await supabase
      .from(table)
      .insert(item as unknown as Record<string, unknown>)
      .select(selectFieldOptions?.createSelectField ?? "*")
      .single<T>();

    if (error) throw new Error(`failed_to_create_${serviceName}`);
    if (!data) throw new Error(`${serviceName}_not_available`);
    return data;
  }

  // --- Update ---
  async function update(updates: Partial<TUpdate> & { id: TKey }): Promise<T> {
    const { data, error } = await supabase
      .from(table)
      .update(updates)
      .eq(keyFieldString, updates.id)
      .select(selectFieldOptions?.updateSelectField ?? "*")
      .single<T>();

    if (error) throw new Error(`failed_to_update_${serviceName}`);
    if (!data) throw new Error(`${serviceName}_not_available`);
    return data;
  }

  // --- Delete Many ---
  async function deleteMany(filters: IFilters<T>): Promise<void> {
    let query = supabase.from(table).delete();
    query = applyFilters<T>(query, filters);
    const { error } = await query;

    if (error) throw new Error(`failed_to_delete_${serviceName}`);
  }

  // --- Delete ---
  async function deleteItem(id: TKey): Promise<void> {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq(keyFieldString, id);

    if (error) throw new Error(`failed_to_delete_${serviceName}`);
  }

  return {
    fetchMany,
    infiniteFetch,
    fetch,
    createMany,
    create,
    update,
    deleteMany,
    delete: deleteItem,
  };
};
