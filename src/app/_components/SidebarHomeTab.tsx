import { HouseIcon } from "lucide-react"



export default function SidebarHomeTab() {
    return (
        < a
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-50"
        >
            <HouseIcon className="h-4 w-4"/>
            Home
        </a >
    )
}