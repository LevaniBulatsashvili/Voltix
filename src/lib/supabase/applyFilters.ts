import type { IFilters } from "./createSupabaseService";

export function applyFilters<T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: any,
  filters?: IFilters<T>,
) {
  if (!filters) return query;

  if (filters.eq)
    Object.entries(filters.eq).forEach(([key, value]) => {
      if (value !== undefined && value !== null) query = query.eq(key, value);
    });

  if (filters.neq)
    Object.entries(filters.neq).forEach(([key, value]) => {
      if (value !== undefined && value !== null) query = query.neq(key, value);
    });

  if (filters.gt)
    Object.entries(filters.gt).forEach(([key, value]) => {
      if (value !== undefined && value !== null) query = query.gt(key, value);
    });

  if (filters.gte)
    Object.entries(filters.gte).forEach(([key, value]) => {
      if (value !== undefined && value !== null) query = query.gte(key, value);
    });

  if (filters.lt)
    Object.entries(filters.lt).forEach(([key, value]) => {
      if (value !== undefined && value !== null) query = query.lt(key, value);
    });

  if (filters.lte)
    Object.entries(filters.lte).forEach(([key, value]) => {
      if (value !== undefined && value !== null) query = query.lte(key, value);
    });

  if (filters.like)
    Object.entries(filters.like).forEach(([key, value]) => {
      if (value) query = query.like(key, value as string);
    });

  if (filters.ilike)
    Object.entries(filters.ilike).forEach(([key, value]) => {
      if (value) query = query.ilike(key, value as string);
    });

  if (filters.in)
    Object.entries(filters.in).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0)
        query = query.in(key, value);
    });

  return query;
}
