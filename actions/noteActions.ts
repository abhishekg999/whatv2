"use server";

import { createClient } from "@/utils/supabase/server";

export const getNotes = async () => {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return {
            "success": false,
            "error": "Unauthorized."
        }
    }

    const result = await supabase.from('notes').select().eq("owner", user.email);
    return result;
}

export const updateNote = async (content: string) => {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return {
            "success": false,
            "error": "Unauthorized."
        }
    }

    const result = await supabase.from('notes').update({
        content: content,
    }).eq('owner', user.email).select();

    console.log(result);
}