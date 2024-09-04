import { NotepadText } from "lucide-react";
import SidebarNoteElement from "./SidebarNoteElement";


export default function SidebarNotesTab() {
    return (
        <>
            <a
                href="#"
                className="flex items-center gap-3 rounded-lg bg-gray-800 px-3 py-2 text-gray-50"
            >
                <NotepadText className="h-4 w-4" />
                Notes
            </a>
        </>
    )
}