"use server";

import { db } from "@/drizzle/db";
import { AIUser, AIUserTable } from "@/drizzle/schema";
import { eq, sql } from "drizzle-orm";

// Create a new AI user
export async function createUser(data: Omit<AIUser, "id" | "createdAt" | "updatedAt">): Promise<AIUser> {
    const [newUser] = await db
        .insert(AIUserTable)
        .values(data)
        .returning()
        .onConflictDoUpdate({
            target: [AIUserTable.clerkUserId],
            set: data,
        });

    if (newUser == null) throw new Error("Failed to create user");
    return newUser;
}

// Get AI user by ID
export async function getUserById(id: string): Promise<AIUser | null> {
    const [user] = await db
        .select()
        .from(AIUserTable)
        .where(eq(AIUserTable.id, id));

    return user || null;
}

// Get AI user by clerk ID
export async function getUserByClerkId(clerkUserId: string): Promise<AIUser | null> {
    const [user] = await db
        .select()
        .from(AIUserTable)
        .where(eq(AIUserTable.clerkUserId, clerkUserId));

    return user || null;
}

// Get AI user by email
export async function getUserByEmail(email: string): Promise<AIUser | null> {
    const [user] = await db
        .select()
        .from(AIUserTable)
        .where(eq(AIUserTable.email, email));

    return user || null;
}

// Update AI user
export async function updateUser(
    id: string,
    data: Partial<Omit<typeof AIUserTable.$inferInsert, "id" | "createdAt" | "updatedAt">>
): Promise<AIUser> {
    const [updatedUser] = await db
        .update(AIUserTable)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(AIUserTable.id, id))
        .returning();

    if (updatedUser == null) throw new Error("Failed to update user");
    return updatedUser;
}


// Soft delete a user
export async function deleteUser(id: string): Promise<AIUser> {
    const [deletedUser] = await db
        .update(AIUserTable)
        .set({ deletedAt: new Date(), updatedAt: new Date() })
        .where(eq(AIUserTable.id, id))
        .returning();

    if (deletedUser == null) throw new Error("Failed to delete user");
    return deletedUser;
}

// Hard delete a user (should be used with caution)
export async function hardDeleteUser(id: string): Promise<void> {
    await db
        .delete(AIUserTable)
        .where(eq(AIUserTable.id, id));
}

// List all active AI users
export async function listActiveUsers(): Promise<AIUser[]> {
    return db
        .select()
        .from(AIUserTable)
        .where(sql`${AIUserTable.deletedAt} IS NULL`);
}

// 获取用户当前积分
export async function getUserCredits(userId: string): Promise<number> {
    const [user] = await db
        .select({ credits: AIUserTable.credits })
        .from(AIUserTable)
        .where(eq(AIUserTable.id, userId));

    if (!user) throw new Error("User not found");
    return user.credits;
}

// 修改用户积分
export async function updateUserCredits(userId: string, creditsChange: number): Promise<number> {
    // 先获取当前积分
    const currentCredits = await getUserCredits(userId);

    // 计算新的积分值
    const newCredits = currentCredits + creditsChange;

    // 积分不能小于0
    const finalCredits = Math.max(0, newCredits);

    // 更新积分
    const [updatedUser] = await db
        .update(AIUserTable)
        .set({
            credits: finalCredits,
            updatedAt: new Date()
        })
        .where(eq(AIUserTable.id, userId))
        .returning({ credits: AIUserTable.credits });

    if (!updatedUser) throw new Error("Failed to update user credits");
    return updatedUser.credits;
}

// 消费积分（创建Logo时使用）
export async function consumeCredits(userId: string, amount: number = 1): Promise<boolean> {
    const currentCredits = await getUserCredits(userId);

    // 检查积分是否充足
    if (currentCredits < amount) {
        return false; // 积分不足
    }

    // 扣除积分
    await updateUserCredits(userId, -amount);
    return true; // 扣除成功
}