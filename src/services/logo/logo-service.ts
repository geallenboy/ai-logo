"use server";

import { db } from "@/drizzle/db";
import { AILogo, AILogoTable } from "@/drizzle/schema";
import { eq, and, sql } from "drizzle-orm";

// Create a new AI logo
export async function createLogo(data: Omit<AILogo, "id" | "createdAt" | "updatedAt">): Promise<AILogo> {
    const [newLogo] = await db
        .insert(AILogoTable)
        .values(data)
        .returning();

    if (newLogo == null) throw new Error("Failed to create logo");
    return newLogo;
}

// Get AI logo by ID
export async function getLogoById(id: string): Promise<AILogo | null> {
    const [logo] = await db
        .select()
        .from(AILogoTable)
        .where(eq(AILogoTable.id, id));

    return logo || null;
}

// Get AI logos by user ID
export async function getLogosByUserId(userId: string): Promise<AILogo[]> {
    return db
        .select()
        .from(AILogoTable)
        .where(eq(AILogoTable.userId, userId));
}

// Get AI logos by user email
export async function getLogosByUserEmail(userEmail: string): Promise<AILogo[]> {
    return db
        .select()
        .from(AILogoTable)
        .where(eq(AILogoTable.userEmail, userEmail));
}

// Update AI logo
export async function updateLogo(
    id: string,
    data: Partial<Omit<typeof AILogoTable.$inferInsert, "id" | "createdAt" | "updatedAt">>
): Promise<AILogo> {
    const [updatedLogo] = await db
        .update(AILogoTable)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(AILogoTable.id, id))
        .returning();

    if (updatedLogo == null) throw new Error("Failed to update logo");
    return updatedLogo;
}

// Delete an AI logo
export async function deleteLogo(id: string): Promise<void> {
    await db
        .delete(AILogoTable)
        .where(eq(AILogoTable.id, id));
}

// Delete all logos for a specific user
export async function deleteLogosByUserId(userId: string): Promise<void> {
    await db
        .delete(AILogoTable)
        .where(eq(AILogoTable.userId, userId));
}

// Find logo by title and user ID
export async function findLogoByTitleAndUserId(title: string, userId: string): Promise<AILogo | null> {
    const [logo] = await db
        .select()
        .from(AILogoTable)
        .where(
            and(
                eq(AILogoTable.title, title),
                eq(AILogoTable.userId, userId)
            )
        );

    return logo || null;
}

// List all logos (with optional pagination)
export async function listAllLogos(limit: number = 100, offset: number = 0): Promise<AILogo[]> {
    return db
        .select()
        .from(AILogoTable)
        .limit(limit)
        .offset(offset);
}

// Count total number of logos
export async function countLogos(): Promise<number> {
    const [result] = await db
        .select({ count: sql`count(*)` })
        .from(AILogoTable);

    return Number(result.count);
}

// Count logos by user ID
export async function countLogosByUserId(userId: string): Promise<number> {
    const [result] = await db
        .select({ count: sql`count(*)` })
        .from(AILogoTable)
        .where(eq(AILogoTable.userId, userId));

    return Number(result.count);
}

