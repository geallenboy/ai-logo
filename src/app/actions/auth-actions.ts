"use server"

import { createServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

interface AuthResponse {
    error: null | string;
    success: boolean;
    data: unknown | null;
}

export const signUpAction = async (formData: FormData): Promise<AuthResponse> => {
    const supbase = await createServer();
    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        options: {
            data: {
                fullName: formData.get("fullName") as string,
            }
        }
    }

    const { data: signupData, error } = await supbase.auth.signUp(data)

    return {
        error: error?.message || "There was an error signing up!",
        success: !error,
        data: signupData || null
    }

}

export const signInAction = async (formData: FormData): Promise<AuthResponse> => {
    const supbase = await createServer();
    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    }
    const { data: signinData, error } = await supbase.auth.signInWithPassword(data)
    return {
        error: error?.message || "There was an error login in!",
        success: !error,
        data: signinData || null
    }

}

export const logoutAction = async (): Promise<void> => {
    const supbase = await createServer();
    await supbase.auth.signOut()
    redirect("/login")

}

export const updateProfileAction = async ({ fullName }: { fullName: string }): Promise<AuthResponse> => {
    const supbase = await createServer();

    const { data: profleData, error } = await supbase.auth.updateUser({
        data: { fullName }
    })

    return {
        error: error?.message || "There was an error updating the profile",
        success: !error,
        data: profleData || null
    }

}

export const resetPasswordAction = async ({ email }: { email: string }): Promise<AuthResponse> => {
    const supbase = await createServer();

    const { data: profleData, error } = await supbase.auth.resetPasswordForEmail(email)

    return {
        error: error?.message || "There was an error sending the reset password email!",
        success: !error,
        data: profleData || null
    }

}

export const changePasswordAction = async (newPassword: string): Promise<AuthResponse> => {
    const supbase = await createServer();
    const { data, error } = await supbase.auth.updateUser({
        password: newPassword
    })
    return {
        error: error?.message || "There was an error changing the password!",
        success: !error,
        data: data || null
    }

}