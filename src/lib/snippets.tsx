"use client";

import { Loader, Check, X, Save } from "lucide-react";

const formatTime = (date: Date) => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

export const SAVING_NOTE = () => (
  <>
    <Loader className="animate-spin w-4 h-4" />
    <span>Saving...</span>
  </>
);

export const SAVED_NOTE = ({ time }: { time?: Date } = {}) => (
  <>
    <Check className="w-4 h-4 text-accent" />
    <span>Synced {time ? formatTime(time) : ""}</span>
  </>
);

export const FAIL_SAVE_NOTE = () => (
  <>
    <X className="w-4 h-4 text-red-400" />
    <span>Sync failed</span>
  </>
);

export const NOT_LOGGED_IN = ({ time }: { time?: Date } = {}) => (
  <>
    <Save className="w-4 h-4 text-foreground-secondary" />
    <span>Saved {time ? formatTime(time) : ""}</span>
  </>
);
