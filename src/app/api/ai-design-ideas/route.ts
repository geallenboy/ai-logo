

import axios from "axios";
import { NextResponse } from "next/server";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "YOUR_GOOGLE_API_KEY";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const response = await axios.post(API_URL, {
      contents: [
        {
          role: "user",
          parts: [
            { text: "Based on Logo of type Modern Mascot Logos Generate a text prompt to create Logo for Logo title/Brand name : Indian Spice with description: Indian Restaurant and referring to prompt: A vibrant logo featuring a friendly, animated character with a playful expression. The character is dressed in a classic uniform, complete with a distinctive accessory that adds personality. In one hand, they hold a signature item that represents the brand, while the other elements of the design—such as small decorative touches or natural accents—enhance the overall look. The background consists of a bold, circular design with subtle accents to highlight the character. Below, the brand name is displayed in bold, stylized lettering, with a slight curve and complementary decorative lines. The overall style is fun, welcoming, and full of character.. Give me 4/5 Suggestion of logo idea (each idea with maximum 4-5 words), Result in JSON format with ideas field" },
          ],
        },
        {
          role: "model",
          parts: [
            { text: "{\n  \"ideas\": [\n    \"Chef Elephant with spices\",\n    \"Smiling Mango character, Turban\",\n    \"Friendly Tiger holding Curry\",\n    \"Animated Nan bread chef\",\n        \"Peacock waiter with plate\"\n  ]\n}\n" },
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


