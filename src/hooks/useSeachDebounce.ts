import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "./useDebounce";

export function useSearchDebounce(initialValue: string, delay: number = 700) {
  const [value, setValue] = useState(
    () => localStorage.getItem(initialValue) ?? "",
  );
  const debouncedValue = useDebounce(value, delay);

  const searchFilters = useMemo(() => {
    const trimmed = debouncedValue.trim();
    if (!trimmed) return undefined;
    return { ilike: { name: `%${trimmed}%` } };
  }, [debouncedValue]);

  useEffect(() => {
    localStorage.setItem(initialValue, debouncedValue.trim());
  }, [debouncedValue, initialValue]);

  return { value, setValue, searchFilters, debouncedValue };
}
