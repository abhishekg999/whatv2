"use client";

import { useTimed } from '@/lib/hooks';
import { createContext } from 'react';

export const TimedMessageContext = createContext({
  timedValue: "",
  setTimedValue: () => {}
} as { 
  timedValue: string | JSX.Element, 
  setTimedValue: (value: string | JSX.Element, timeout?: number) => void 
});

export const TimedMessageProvider = ({ children }: { children: React.ReactNode }) => {
  const [timedValue, setTimedValue] = useTimed<string | JSX.Element>('');
  return (
    <TimedMessageContext.Provider value={{ timedValue, setTimedValue }}>
      {children}
    </TimedMessageContext.Provider>
  );
}