import { useEffect, useState } from "react";

function readStoredValue(key, defaultValue) {
  if (typeof window === "undefined") {
    return defaultValue;
  }

  try {
    const storedValue = window.localStorage.getItem(key);
    return storedValue === null ? defaultValue : JSON.parse(storedValue);
  } catch {
    return defaultValue;
  }
}

export function useLocalStorageState(key, defaultValue) {
  const [value, setValue] = useState(() => readStoredValue(key, defaultValue));

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore storage failures in constrained environments.
    }
  }, [key, value]);

  return [value, setValue];
}
