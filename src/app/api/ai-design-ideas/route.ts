import axios from "axios";
import { NextResponse } from "next/server";

const API_KEY = process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY || "YOUR_DEEPSEEK_API_KEY";
const API_URL = "https://api.deepseek.com/v1/chat/completions";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    console.log("Using DeepSeek API");

    const response = await axios.post(API_URL, {
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant specialized in logo design ideas."
        },
        {
          role: "user",
          content: "Based on Logo of type Modern Mascot Logos Generate a text prompt to create Logo for Logo title/Brand name : Indian Spice with description: Indian Restaurant and referring to prompt: A vibrant logo featuring a friendly, animated character with a playful expression. The character is dressed in a classic uniform, complete with a distinctive accessory that adds personality. In one hand, they hold a signature item that represents the brand, while the other elements of the design—such as small decorative touches or natural accents—enhance the overall look. The background consists of a bold, circular design with subtle accents to highlight the character. Below, the brand name is displayed in bold, stylized lettering, with a slight curve and complementary decorative lines. The overall style is fun, welcoming, and full of character.. Give me 4/5 Suggestion of logo idea (each idea with maximum 4-5 words), Result in JSON format with ideas field"
        },
        {
          role: "assistant",
          content: "{\n  \"ideas\": [\n    \"Chef Elephant with spices\",\n    \"Smiling Mango character, Turban\",\n    \"Friendly Tiger holding Curry\",\n    \"Animated Nan bread chef\",\n    \"Peacock waiter with plate\"\n  ]\n}\n"
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


    const responseText = response.data?.choices[0]?.message?.content || "";
    console.log("Raw response:", responseText);

    // 尝试提取JSON
    let jsonResult;
    try {

      const cleanedText = responseText.replace(/```json|```/g, "").trim();
      jsonResult = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      return NextResponse.json({ error: "Failed to parse JSON response" }, { status: 500 });
    }

    return NextResponse.json(jsonResult);
  } catch (error: any) {
    console.error("DeepSeek API Error:", error.response?.data || error.message);
    return NextResponse.json({ error: error.response?.data || "Failed to fetch AI response" }, { status: 500 });
  }
}