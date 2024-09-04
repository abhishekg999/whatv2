"use client";
import SidebarHomeTab from "./SidebarHomeTab";
import SidebarNotesTab from "./SidebarNotesTab";
import { useRef } from "react";

import { Settings, Upload, Download } from "lucide-react";

export default function Sidebar() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleImport = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.FormEvent<HTMLInputElement>) => {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            const reader = new FileReader();

            reader.onload = (e) => {
                if (e.target?.result) {
                    try {
                        const json = JSON.parse(e.target.result as string);
                        typeof (json);
                        // just mfing reload the page lol
                        window.location.reload();
                    } catch (error) {
                        console.error("Error parsing JSON:", error);
                        alert("The selected file is not a valid JSON.");
                    }
                }
            };
            reader.readAsText(file);
        }
    };

    const handleExport = () => {
        window.alert("Exporting notes is not yet implemented.");
    };

    return (
        <div className="hidden border-r bg-gray-800/40 lg:block overflow-y-scroll">
            <nav className="grid items-start p-4 px-6 text-sm font-medium w-80">
                <div className="flex-1">
                    {/* Home */}
                    <SidebarHomeTab />

                    {/* Notes */}
                    <SidebarNotesTab />
                    <a
                        href="#"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-50"
                    >
                        <Settings className="h-4 w-4" />
                        Settings
                    </a>

                    {/* Export */}
                    <a
                        href="#"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-50"
                        onClick={handleExport}
                    >
                        <Upload className="h-4 w-4" />
                        Export
                    </a>

                    {/* Import */}
                    <a
                        href="#"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-50"
                        onClick={handleImport}
                    >
                        <Download className="h-4 w-4" />
                        Import
                    </a>

                    <input
                        type="file"
                        accept="application/json"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />
                </div>
            </nav>
        </div>
    );
}
