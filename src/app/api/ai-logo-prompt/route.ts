import axios from "axios";
import { NextResponse } from "next/server";

const API_KEY = process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY;
const API_URL = "https://api.deepseek.com/v1/chat/completions";

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();
        console.log(API_URL);

        const response = await axios.post(API_URL, {
            model: "deepseek-chat",
            messages: [
                {
                    role: "user",
                    content: "为标志标题/品牌名称生成文本提示：印度餐厅，描述：印度餐厅，海洋蓝色组合，包括现代锐利线条标志设计理念，参考以下标志提示：设计一个具有复古现代氛围的创意艺术标志，展示品牌的身份。使用粗体轮廓、复杂图案和鲜艳的对比色，使设计脱颖而出。根据品牌的定位，融入食物、自然、技术或生活方式等主题元素。字体应该既有趣又清晰，通过动态和平衡的布局补充整体构图。确保标志感觉独特、多功能且引人注目。以JSON格式给我结果，只包含prompt字段"
                },
                {
                    role: "assistant",
                    content: "```json\n{\n  \"prompt\": \"为一家名为印度餐厅的印度餐馆创建一个现代且线条锐利的标志。该标志应使用海洋蓝色组合。参考创意艺术标志的设计理念，带有复古现代氛围，使用粗体轮廓并融入图案（复杂或抽象）来增强设计。欢迎与印度食物或文化符号相关的主题元素。字体应现代、有趣且清晰，补充标志的整体动态和平衡布局。确保标志感觉独特、多功能且引人注目。主要颜色应为海洋蓝，辅助颜色为互补的浅蓝色或白色，以创造对比。旨在创建一个既精致又具有吸引力的标志，反映餐厅对印度美食的现代方法。\"\n}\n```\n"
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 1000,
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            timeout: 15000,
        });

        const assistantResponse = response.data?.choices[0]?.message?.content || "";
        const jsonMatch = assistantResponse.match(/```json\n([\s\S]*?)\n```/) || ["", assistantResponse];
        const jsonContent = jsonMatch[1].trim();

        console.log(JSON.parse(jsonContent));
        return NextResponse.json(JSON.parse(jsonContent));
    } catch (error: any) {
        console.error("DeepSeek API Error:", error.response?.data || error.message);
        return NextResponse.json({ error: error.response?.data || "Failed to fetch AI response" }, { status: 500 });
    }
}