import { useRef, useState } from "react";
import { InsertNote } from "./note";

/**
 * Sync the initialValue note with an existing note from localStorage if it exists.
 * Precendence:
 * 1. User note from server
 * 2. Updated local note
 * 3. Default note from server
 */
export function useNoteLocalStorage(key: string, serverNote: InsertNote) {
  const [storedValue, setStoredValue] = useState<InsertNote>(() => {
    if (new Date(serverNote.updatedAt!).getTime() !== 0) {
      try {
        window.localStorage.setItem(key, JSON.stringify(serverNote));
      } catch (error) {
        console.error("Failed to save server note to localStorage:", error);
      }
      return serverNote;
    }

    try {
      const item = window.localStorage.getItem(key);
      if (!item) return serverNote;

      const parsed = JSON.parse(item);
      if (!parsed || typeof parsed !== "object" || !("content" in parsed)) {
        console.warn("Invalid localStorage data, clearing");
        window.localStorage.removeItem(key);
        return serverNote;
      }

      return parsed;
    } catch (error) {
      console.error("Failed to parse localStorage, clearing:", error);
      try {
        window.localStorage.removeItem(key);
      } catch (clearError) {
        console.error("Failed to clear localStorage:", clearError);
      }
      return serverNote;
    }
  });

  const setValue = (value: InsertNote | ((val: InsertNote) => InsertNote)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Failed to save to localStorage:", error);
      try {
        window.localStorage.removeItem(key);
      } catch (clearError) {
        console.error("Failed to clear localStorage:", clearError);
      }
    }
  };

  return [storedValue, setValue] as const;
}

export function useTimed<T>(defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const setTimedValue = (
    newVal: T | ((val: T) => T),
    timeout: number = Infinity,
  ) => {
    // Clear the previous timeout
    clearTimeout(timeoutRef.current);
    timeoutRef.current = undefined;

    // Set the new value
    const valueToStore = newVal instanceof Function ? newVal(value) : newVal;
    setValue(valueToStore);
    // Set the timeout if not Infinity. If Infinity, don't set a timeout
    if (timeout !== Infinity) {
      timeoutRef.current = setTimeout(() => {
        setValue(defaultValue);
      }, timeout);
    }
  };

  return [value, setTimedValue] as const;
}
