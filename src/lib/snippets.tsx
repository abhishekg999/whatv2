"use client";

import { Loader, CheckCircle, CircleX, CircleAlert } from "lucide-react";
export const SAVING_NOTE = () => (
  <>
    <span>Saving note...</span>
    <Loader className="animate-spin w-4 h-4 mr-2" />
  </>
);

export const SAVED_NOTE = () => (
  <>
    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
    <span>Note saved!</span>
  </>
);

export const FAIL_SAVE_NOTE = () => (
  <>
    <CircleX className="w-4 h-4 text-red-500 mr-2" />
    <span>Failed to save note remotely.</span>
  </>
)

export const NOT_LOGGED_IN = () => (
  <>
    <CircleAlert className="w-4 h-4 text-yellow-500 mr-2" />
    <span>Note saved locally.</span>
  </>
)

