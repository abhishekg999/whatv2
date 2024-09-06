import { useState, useRef } from "react";
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
    // If there is an existing note on the server, use it.
    if (new Date(serverNote.updatedAt!).getTime() !== 0) {
      window.localStorage.setItem(key, JSON.stringify(serverNote));
      return serverNote;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : serverNote;
    } catch (error) {
      console.error(error);
      return serverNote;
    }
  });

  const setValue = (value: InsertNote | ((val: InsertNote) => InsertNote)) => {
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

