"use server";

import { cache } from 'react';
import { createServer } from "@/lib/supabase/server";
import { SupabaseClient } from '@supabase/supabase-js';

interface AuthResponse {
    error: null | string;
    success: boolean;
    data: any | null;
}


export const getUser = cache(async (supabase: SupabaseClient) => {
    const {
        data: { user }
    } = await supabase.auth.getUser()
    return user;
});

export const getUserDetails = cache(async (supabase: SupabaseClient) => {
    const { data: userDetails } = await supabase
        .from('ai_logo_users')
        .select('*')
        .single();
    return userDetails;
});

export const usersUpdateAction = async (UserData: any): Promise<AuthResponse> => {
    const { email, name } = UserData
    const supabase = await createServer()
    const { data: { user } } = await supabase.auth.getUser();
    console.log("user:", user)
    try {
        const { data, error } = await supabase.from("ai_logo_users").select("*").eq("email", email).single();
        console.log(error, 66, data)
        if (error && error.code !== 'PGRST116') {
            console.log(1)
            return {
                error: error.message,
                success: false,
                data: null
            }
        }
        if (data) {
            console.log(2)
            return {
                error: null,
                success: true,
                data: data
            }
        } else {
            console.log(3, name, email, user?.id)
            const { data: newUser, error: insertError } = await supabase.from("ai_logo_users").insert([
                {
                    id: user?.id,
                    name,
                    email,
                    credits: 5
                }
            ]).single();

            console.log(4, newUser, insertError)

            if (insertError) {
                return {
                    error: insertError.message,
                    success: false,
                    data: null
                }
            }
            const { data: insertData } = await supabase.from("ai_logo_users").select("*").eq("email", email).single();
            return {
                error: null,
                success: true,
                data: insertData
            }
        }
    } catch (error: any) {
        console.error('Error:', error);
        return {
            error: error.message || "The replicate api token is not set!",
            success: false,
            data: null
        }
    }

}