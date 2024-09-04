import { Loader, CheckCircle } from "lucide-react";
export const SAVING_NOTE = (
    <div className="flex items-center gap-2">
        <span>Saving note...</span>
        <Loader className="animate-spin w-4 h-4 mr-2" />
    </div>
);

export const SAVED_NOTE = (
    <div className="flex items-center gap-2">
        <span>Note saved!</span>
        <CheckCircle className="w-4 h-4 mr-2" />
    </div>
);