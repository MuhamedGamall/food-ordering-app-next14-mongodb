
import { useEffect, useState } from "react";

export function useStorage(key: string, fallbackValue: string) {
  const [value, setValue] = useState(fallbackValue);
  useEffect(() => {
    const stored = sessionStorage.getItem(key);
    setValue(stored ? stored : fallbackValue);
  }, [fallbackValue, key]);

  useEffect(() => {
    sessionStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue] as const;
}
