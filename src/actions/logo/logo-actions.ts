"use server";

import { AILogo } from "@/drizzle/schema";
import * as logoService from "@/services/logo/logo-service";
import { ActionResponse, errorResponse, successResponse } from "@/actions";




// 创建新的AI Logo
export async function createLogoAction(ailogo: Omit<AILogo, "id" | "createdAt" | "updatedAt">): Promise<ActionResponse> {
    try {
        // 调用服务创建Logo
        const newLogo = await logoService.createLogo(ailogo);
        return successResponse({ logo: newLogo });

    } catch (error) {
        console.error("创建Logo时发生错误:", error);
        return errorResponse(error instanceof Error ? error.message : "创建Logo失败");
    }
}

// 通过ID获取AI Logo
export async function getLogoByIdAction(id: string): Promise<ActionResponse> {
    try {
        if (!id) {
            return errorResponse("Logo ID不能为空");
        }

        const logo = await logoService.getLogoById(id);

        if (!logo) {
            return errorResponse("未找到指定Logo");
        }

        return successResponse({ logo });

    } catch (error) {
        console.error("获取Logo时发生错误:", error);
        return errorResponse(error instanceof Error ? error.message : "获取Logo失败");
    }
}

// 获取用户的所有AI Logos
export async function getLogosByUserIdAction(userId: string): Promise<ActionResponse> {
    try {
        if (!userId) {
            return errorResponse("用户ID不能为空");
        }

        const logos = await logoService.getLogosByUserId(userId);
        return successResponse({ logos });

    } catch (error) {
        console.error("获取用户Logos时发生错误:", error);
        return errorResponse(error instanceof Error ? error.message : "获取用户Logos失败");
    }
}

// 通过用户邮箱获取AI Logos
export async function getLogosByUserEmailAction(userEmail: string): Promise<ActionResponse> {
    try {
        if (!userEmail) {
            return errorResponse("用户邮箱不能为空");
        }

        const logos = await logoService.getLogosByUserEmail(userEmail);
        return successResponse({ logos });

    } catch (error) {
        console.error("通过邮箱获取Logos时发生错误:", error);
        return errorResponse(error instanceof Error ? error.message : "获取用户Logos失败");
    }
}

// 更新AI Logo
export async function updateLogoAction(id: string, formData: FormData | Record<string, any>): Promise<ActionResponse> {
    try {
        if (!id) {
            return errorResponse("Logo ID不能为空");
        }

        // 处理表单数据
        const data = formData instanceof FormData
            ? Object.fromEntries(formData.entries())
            : formData;

        // 调用服务更新Logo
        const updatedLogo = await logoService.updateLogo(id, data);
        return successResponse({ logo: updatedLogo });

    } catch (error) {
        console.error("更新Logo时发生错误:", error);
        return errorResponse(error instanceof Error ? error.message : "更新Logo失败");
    }
}

// 删除AI Logo
export async function deleteLogoAction(id: string): Promise<ActionResponse> {
    try {
        if (!id) {
            return errorResponse("Logo ID不能为空");
        }

        await logoService.deleteLogo(id);
        return successResponse({ message: "Logo删除成功" });

    } catch (error) {
        console.error("删除Logo时发生错误:", error);
        return errorResponse(error instanceof Error ? error.message : "删除Logo失败");
    }
}

// 删除用户的所有Logos
export async function deleteLogosByUserIdAction(userId: string): Promise<ActionResponse> {
    try {
        if (!userId) {
            return errorResponse("用户ID不能为空");
        }

        await logoService.deleteLogosByUserId(userId);
        return successResponse({ message: "用户的所有Logos已删除" });

    } catch (error) {
        console.error("删除用户Logos时发生错误:", error);
        return errorResponse(error instanceof Error ? error.message : "删除用户Logos失败");
    }
}

// 通过标题和用户ID查找Logo
export async function findLogoByTitleAndUserIdAction(title: string, userId: string): Promise<ActionResponse> {
    try {
        if (!title || !userId) {
            return errorResponse("标题和用户ID不能为空");
        }

        const logo = await logoService.findLogoByTitleAndUserId(title, userId);

        if (!logo) {
            return errorResponse("未找到指定Logo");
        }

        return successResponse({ logo });

    } catch (error) {
        console.error("查找Logo时发生错误:", error);
        return errorResponse(error instanceof Error ? error.message : "查找Logo失败");
    }
}

// 获取所有Logos（带分页）
export async function listAllLogosAction(limit: number = 100, offset: number = 0): Promise<ActionResponse> {
    try {
        const logos = await logoService.listAllLogos(limit, offset);
        return successResponse({
            logos,
            pagination: { limit, offset }
        });

    } catch (error) {
        console.error("获取所有Logos时发生错误:", error);
        return errorResponse(error instanceof Error ? error.message : "获取所有Logos失败");
    }
}

// 获取Logos总数
export async function countLogosAction(): Promise<ActionResponse> {
    try {
        const count = await logoService.countLogos();
        return successResponse({ count });

    } catch (error) {
        console.error("获取Logos总数时发生错误:", error);
        return errorResponse(error instanceof Error ? error.message : "获取Logos总数失败");
    }
}

// 获取用户的Logos数量
export async function countLogosByUserIdAction(userId: string): Promise<ActionResponse> {
    try {
        if (!userId) {
            return errorResponse("用户ID不能为空");
        }

        const count = await logoService.countLogosByUserId(userId);
        return successResponse({ count });

    } catch (error) {
        console.error("获取用户Logos数量时发生错误:", error);
        return errorResponse(error instanceof Error ? error.message : "获取用户Logos数量失败");
    }
}