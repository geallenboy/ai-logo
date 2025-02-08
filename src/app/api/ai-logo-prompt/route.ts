

import axios from "axios";
import { NextResponse } from "next/server";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "YOUR_GOOGLE_API_KEY";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();
        console.log(API_URL)
        const response = await axios.post(API_URL, {
            contents: [
                {
                    role: "user",
                    parts: [
                        { text: "Generate a text prompt to create Logo for Logo Title/Brand name : Indian Restaurant,with description: Indian Restro, with Color combination of Ocean Blues and include Modern Sharp Lined Logos design idea and Referring to this Logo Prompt:Design a creative and artistic logo with a retro-modern vibe that showcases the brand's identity. Use bold outlines, intricate patterns, and vibrant, contrasting colors to make the design pop. Incorporate thematic elements like food, nature, technology, or lifestyle symbols depending on the brand's niche. The typography should be playful yet clear, complementing the overall composition with a dynamic and balanced layout. Ensure the logo feels unique, versatile, and eye-catching  Give me result in JSON portal with prompt field only" },
                    ],
                },
                {
                    role: "model",
                    parts: [
                        { text: "```json\n{\n  \"prompt\": \"Create a modern and sharp-lined logo for an Indian Restaurant called 'Indian Restro'. The logo should use a color combination of ocean blues.  Referencing the design idea of a creative and artistic logo with a retro-modern vibe, use bold outlines and incorporate patterns (intricate or abstract) to enhance the design. Thematic elements related to Indian food or cultural symbols are welcome. Typography should be modern, playful and clear, complementing the logo’s overall dynamic and balanced layout. Ensure the logo feels unique, versatile, and eye-catching. The primary color should be an ocean blue with a secondary color of a complementary lighter blue or white to create contrast. Aim for a logo that feels both sophisticated and inviting, reflecting the restaurant's modern approach to Indian cuisine.\"\n}\n```\n" },
                    ],
                },
                {
                    role: "user", parts: [{ text: prompt }]
                }],
        }, {
            headers: { "Content-Type": "application/json" },
            timeout: 15000,

        });


        console.log(JSON.parse(response.data?.candidates[0]?.content?.parts[0].text.replace("```json", "").replace("```", "")))
        return NextResponse.json(JSON.parse(response.data?.candidates[0]?.content?.parts[0].text.replace("```json", "").replace("```", "")));
    } catch (error: any) {
        console.error("Google AI API Error:", error.response?.data || error.message);
        return NextResponse.json({ error: error.response?.data || "Failed to fetch AI response" }, { status: 500 });
    }
}


