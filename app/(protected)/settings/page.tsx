import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default async function Settings() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/sign-in");
    }

    return (
        <div className="flex-1 flex flex-col gap-12 text-center mx-auto">
            <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
                <InfoIcon size="16" strokeWidth={2} />
                This is a protected page that you can only see as an authenticated
                user
            </div>
            <div className="flex flex-col gap-2 justify-center align-middle">
                <h2 className="font-bold text-2xl mb-4">Your user details</h2>
                <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
                    {JSON.stringify(user, null, 2)}
                </pre>
            </div>
        </div>
    );
}
