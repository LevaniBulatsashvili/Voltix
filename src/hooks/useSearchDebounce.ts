import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "./useDebounce";

export function useSearchDebounce(storageKey: string, delay = 700) {
  const [value, setValue] = useState(
    () => localStorage.getItem(storageKey) ?? "",
  );
  const debouncedValue = useDebounce(value, delay);

  const searchFilters = useMemo(() => {
    const trimmed = debouncedValue.trim();
    if (!trimmed) return undefined;
    return { ilike: { name: `%${trimmed}%` } };
  }, [debouncedValue]);

  useEffect(() => {
    localStorage.setItem(storageKey, debouncedValue.trim());
  }, [debouncedValue, storageKey]);

  return { value, setValue, searchFilters, debouncedValue };
}
