export function createStorage<T>(key: string, defaultValue: T) {
  return {
    get(): T {
      try {
        const data = localStorage.getItem(key);
        return data ? (JSON.parse(data) as T) : defaultValue;
      } catch {
        return defaultValue;
      }
    },
    set(value: T) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch {
        throw new Error(`failed_to_save_${key}`);
      }
    },
    clear() {
      try {
        localStorage.removeItem(key);
      } catch {
        throw new Error(`failed_to_clear_${key}`);
      }
    },
  };
}
