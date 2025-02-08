
"use server";

import { createServer } from "@/lib/supabase/server";

export const getLogoAction = async ({ user }: { user: any }) => {
    const supabase = await createServer()

    const { data, error } = await supabase
        .from("logos")
        .select("*")
        .eq("user_email", user.email)

    if (error) {
        console.error("Error fetching logos:", error);
        return {
            error: error.message || "Error fetching logos!",
            success: false,
            data: null
        }
    }


    return {
        error: null,
        success: true,
        data: data as any
    }
}