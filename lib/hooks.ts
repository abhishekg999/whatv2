import { useState, useRef } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}

export function useTimed<T>(defaultValue: T) {
  const [storedValue, setStoredValue] = useState<T>(defaultValue);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const setTimedValue = (newVal: T | ((val: T) => T), timeout: number = Infinity) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = undefined;

    const valueToStore = newVal instanceof Function ? newVal(storedValue) : newVal;
    setStoredValue(valueToStore);

    if (timeout !== Infinity) {
      timeoutRef.current = setTimeout(() => {
        setStoredValue(defaultValue);
      }, timeout);
    }
  };

  return [storedValue, setTimedValue] as const;
}

