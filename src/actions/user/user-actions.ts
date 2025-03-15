"use server";

import { AIUser } from "@/drizzle/schema";
import * as userService from "@/services/user/user-service";
import { ActionResponse, errorResponse, successResponse } from "@/actions";


// 创建新的AI用户
export async function createUserAction(data: Omit<AIUser, "id" | "createdAt" | "updatedAt">): Promise<ActionResponse> {
    try {

        // 调用服务创建用户
        const newUser = await userService.createUser(data);
        return successResponse({ user: newUser });

    } catch (error) {
        console.error("创建用户时发生错误:", error);
        return errorResponse(error instanceof Error ? error.message : "创建用户失败");
    }
}

// 通过ID获取AI用户
export async function getUserByIdAction(id: string): Promise<ActionResponse> {
    try {
        if (!id) {
            return errorResponse("用户ID不能为空");
        }

        const user = await userService.getUserById(id);

        if (!user) {
            return errorResponse("未找到指定用户");
        }

        return successResponse({ user });

    } catch (error) {
        console.error("获取用户时发生错误:", error);
        return errorResponse(error instanceof Error ? error.message : "获取用户失败");
    }
}

// 通过Clerk ID获取用户
export async function getUserByClerkIdAction(clerkUserId: string): Promise<ActionResponse> {
    try {
        if (!clerkUserId) {
            return errorResponse("Clerk用户ID不能为空");
        }

        const user = await userService.getUserByClerkId(clerkUserId);

        if (!user) {
            return errorResponse("未找到指定用户");
        }

        return successResponse({ user });

    } catch (error) {
        console.error("通过ClerkID获取用户时发生错误:", error);
        return errorResponse(error instanceof Error ? error.message : "获取用户失败");
    }
}

// 通过邮箱获取用户
export async function getUserByEmailAction(email: string): Promise<ActionResponse> {
    try {
        if (!email) {
            return errorResponse("用户邮箱不能为空");
        }

        const user = await userService.getUserByEmail(email);

        if (!user) {
            return errorResponse("未找到指定用户");
        }

        return successResponse({ user });

    } catch (error) {
        console.error("通过邮箱获取用户时发生错误:", error);
        return errorResponse(error instanceof Error ? error.message : "获取用户失败");
    }
}

// 更新用户信息
export async function updateUserAction(id: string, formData: FormData | Record<string, any>): Promise<ActionResponse> {
    try {
        if (!id) {
            return errorResponse("用户ID不能为空");
        }

        // 处理表单数据
        const data = formData instanceof FormData
            ? Object.fromEntries(formData.entries())
            : formData;

        // 调用服务更新用户
        const updatedUser = await userService.updateUser(id, data);
        return successResponse({ user: updatedUser });

    } catch (error) {
        console.error("更新用户时发生错误:", error);
        return errorResponse(error instanceof Error ? error.message : "更新用户失败");
    }
}

// 软删除用户
export async function deleteUserAction(id: string): Promise<ActionResponse> {
    try {
        if (!id) {
            return errorResponse("用户ID不能为空");
        }

        const deletedUser = await userService.deleteUser(id);
        return successResponse({
            user: deletedUser,
            message: "用户已软删除"
        });

    } catch (error) {
        console.error("删除用户时发生错误:", error);
        return errorResponse(error instanceof Error ? error.message : "删除用户失败");
    }
}

// 硬删除用户（谨慎使用）
export async function hardDeleteUserAction(id: string): Promise<ActionResponse> {
    try {
        if (!id) {
            return errorResponse("用户ID不能为空");
        }

        await userService.hardDeleteUser(id);
        return successResponse({ message: "用户已永久删除" });

    } catch (error) {
        console.error("硬删除用户时发生错误:", error);
        return errorResponse(error instanceof Error ? error.message : "删除用户失败");
    }
}

// 获取所有活跃用户
export async function listActiveUsersAction(): Promise<ActionResponse> {
    try {
        const users = await userService.listActiveUsers();
        return successResponse({ users });

    } catch (error) {
        console.error("获取活跃用户时发生错误:", error);
        return errorResponse(error instanceof Error ? error.message : "获取用户列表失败");
    }
}

// 获取用户当前积分
export async function getUserCreditsAction(userId: string): Promise<ActionResponse> {
    try {
        if (!userId) {
            return errorResponse("用户ID不能为空");
        }

        const credits = await userService.getUserCredits(userId);
        return successResponse({ credits });

    } catch (error) {
        console.error("获取用户积分时发生错误:", error);
        return errorResponse(error instanceof Error ? error.message : "获取用户积分失败");
    }
}

// 修改用户积分
export async function updateUserCreditsAction(userId: string, creditsChange: number): Promise<ActionResponse> {
    try {
        if (!userId) {
            return errorResponse("用户ID不能为空");
        }

        if (isNaN(creditsChange)) {
            return errorResponse("积分变更值必须是数字");
        }

        const newCredits = await userService.updateUserCredits(userId, creditsChange);
        return successResponse({
            credits: newCredits,
            message: creditsChange >= 0 ? "积分已增加" : "积分已扣除"
        });

    } catch (error) {
        console.error("更新用户积分时发生错误:", error);
        return errorResponse(error instanceof Error ? error.message : "更新用户积分失败");
    }
}

// 消费积分
export async function consumeCreditsAction(userId: string, amount: number = 1): Promise<ActionResponse> {
    try {
        if (!userId) {
            return errorResponse("用户ID不能为空");
        }

        if (isNaN(amount) || amount <= 0) {
            return errorResponse("消费积分数量必须是正数");
        }

        const success = await userService.consumeCredits(userId, amount);

        if (!success) {
            return errorResponse("积分不足");
        }

        // 获取剩余积分
        const remainingCredits = await userService.getUserCredits(userId);

        return successResponse({
            success: true,
            remainingCredits,
            message: `成功消费${amount}积分`
        });

    } catch (error) {
        console.error("消费积分时发生错误:", error);
        return errorResponse(error instanceof Error ? error.message : "消费积分失败");
    }
}