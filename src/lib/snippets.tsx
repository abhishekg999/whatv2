import { Loader, CheckCircle, CircleX, CircleAlert } from "lucide-react";
export const SAVING_NOTE = () => (
  <div className="flex items-center gap-2">
    <span>Saving note...</span>
    <Loader className="animate-spin w-4 h-4 mr-2" />
  </div>
);

export const SAVED_NOTE = () => (
  <div className="flex items-center gap-2">
    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
    <span>Note saved!</span>
  </div>
);

export const FAIL_SAVE_NOTE = () => (
  <div className="flex items-center gap-2">
    <CircleX className="w-4 h-4 text-red-500 mr-2" />
    <span>Note saved locally, failed to save note remotely.</span>
  </div>
)

export const NOT_LOGGED_IN = () => (
  <div className="flex items-center gap-2">
    <CircleAlert className="w-4 h-4 text-red-500 mr-2" />
    <span>Note saved locally, login to sync notes.</span>
  </div>
)
