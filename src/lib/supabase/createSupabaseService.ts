import { supabase } from ".";

type TableName = string;

export interface IFetchManyOptions<T> {
  filters?: Partial<T>;
  limit?: number;
  offset?: number;
}

export interface ISelectFieldOptions {
  fetchManySelectField?: string;
  fetchSelectField?: string;
  createSelectField?: string;
  updateSelectField?: string;
}

export interface ICrudServiceOptions<T> {
  table: TableName;
  keyField: keyof T;
  serviceName: string;
  selectFieldOptions?: ISelectFieldOptions;
}

export const createSupabaseService = <
  T,
  TCreate,
  TUpdate,
  TKey = string | number,
>({
  table,
  keyField,
  serviceName,
  selectFieldOptions,
}: ICrudServiceOptions<T>) => {
  const keyFieldString = keyField as string;

  return {
    fetchMany: async (options?: IFetchManyOptions<T>): Promise<T[]> => {
      const { filters, limit, offset } = options ?? {};

      let query = supabase
        .from(table)
        .select(selectFieldOptions?.fetchManySelectField ?? "*");

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          query = query.eq(key, value);
        });
      }

      if (limit) query = query.limit(limit);
      if (offset) query = query.range(offset, offset + (limit ?? 9) - 1);

      const result = await query;

      if (result.error) {
        throw new Error(`failed_to_fetch_${serviceName ?? "data"}`);
      }

      return result.data as T[];
    },

    fetch: async (id: TKey): Promise<T> => {
      const { data, error } = await supabase
        .from(table)
        .select(selectFieldOptions?.fetchSelectField ?? "*")
        .eq(keyFieldString, id)
        .single<T>();

      if (error) throw new Error(`failed_to_fetch_${serviceName ?? "data"}`);
      if (!data) throw new Error(`$(${serviceName ?? "data"})_not_available`);
      return data;
    },

    create: async (item: TCreate): Promise<T> => {
      const { data, error } = await supabase
        .from(table)
        .insert(item)
        .select(selectFieldOptions?.createSelectField ?? "*")
        .single<T>();

      if (error) throw new Error(`failed_to_create_${serviceName ?? "data"}`);
      if (!data) throw new Error(`$(${serviceName ?? "data"})_not_available`);
      return data;
    },

    update: async (
      updates: Partial<TUpdate> & { id: string | number },
    ): Promise<T> => {
      const { data, error } = await supabase
        .from(table)
        .update(updates)
        .eq(keyFieldString, updates.id)
        .select(selectFieldOptions?.updateSelectField ?? "*")
        .single<T>();

      if (error) throw new Error(`failed_to_update_${serviceName ?? "data"}`);
      if (!data) throw new Error(`$(${serviceName ?? "data"})_not_available`);
      return data;
    },

    delete: async (id: TKey): Promise<void> => {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq(keyFieldString, id);

      if (error) throw new Error(`failed_to_delete_${serviceName ?? "data"}`);
    },
  };
};
