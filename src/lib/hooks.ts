import { useState, useRef } from "react";
import { InsertNote } from "./note";

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
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}

/**
 * Sync the initialValue note with an existing note from localStorage if it exists.
 */
export function useNoteLocalStorage(key: string, defaultNote: InsertNote) {
  const [storedValue, setStoredValue] = useState<InsertNote>(() => {

    const item = window.localStorage.getItem(key);
    if (!item) {
      window.localStorage.setItem(key, JSON.stringify(defaultNote));
      console.log("No note found in localStorage. Setting default note.", defaultNote);
      return defaultNote;
    }
    const parsedItem: InsertNote = JSON.parse(item);
    if (new Date(parsedItem.updatedAt!) >= new Date(defaultNote.updatedAt!)) {
      // If the stored note is newer than the default note, return the stored note
      console.log("Found newer note in localStorage. Using stored note.", parsedItem);
      return parsedItem;
    } else {
    // Otherwise, set the stored note to the default note
      window.localStorage.setItem(key, JSON.stringify(defaultNote));
      console.log("Found older note in localStorage. Setting default note.", defaultNote);
      return defaultNote;
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

