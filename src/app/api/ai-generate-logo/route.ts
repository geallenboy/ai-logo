

import axios from "axios";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import { createServer } from "@/lib/supabase/server";
import sharp from "sharp";

export async function POST(req: Request) {
    const supabase = await createServer()
    try {
        const { prompt, title, desc, type, users } = await req.json();
        let base64ImageWithMime = '';
        if (type === "Free") {
            const response = await axios.post('https://api-inference.huggingface.co/models/strangerzonehf/Flux-Midjourney-Mix2-LoRA',
                prompt,
                {
                    headers: {
                        Authorization: "Bearer " + process.env.NEXT_PUBLIC_HUGGING_FACE_API_KEY,
                        "Content-Type": "application/json",
                    },
                    responseType: "arraybuffer"
                }
            )
            const buffer = Buffer.from(response.data, "binary");
            const base64Image = buffer.toString("base64");

            base64ImageWithMime = `data:image/png;base64,${base64Image}`;
        } else {
            const replicate = new Replicate({
                auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN,
                useFileOutput: false
            });
            //Replicate API End point
            const output: any = await replicate.run(
                "bytedance/hyper-flux-8step:81946b1e09b256c543b35f37333a30d0d02ee2cd8c4f77cd915873a1ca622bad",
                {
                    input: {
                        prompt,
                        num_outputs: 1,
                        aspect_ratio: "1:1",
                        output_format: "png",
                        guidance_scale: 3.5,
                        output_quality: 80,
                        num_inference_steps: 8
                    }
                }
            );
            console.log(output);
            base64ImageWithMime = await ConvertImageToBase64(output[0]);
            await supabase
                .from('ai_logo_users')
                .update({ credits: Number(users.credits) - 1 })
                .eq('id', users.id);
        }

        const { data, error } = await supabase
            .from('ai_logos')
            .insert([
                {
                    user_email: users?.email,
                    image: base64ImageWithMime,
                    title: title,
                    desc: desc,
                    user_id: users?.id
                }
            ]);
        console.log(data, error)

        return NextResponse.json({ image: base64ImageWithMime, success: true, error: null })

    } catch (error: any) {

        return NextResponse.json({ error: error.response?.data || "Failed to fetch AI response" }, { status: 500 });
    }
}
async function ConvertImageToBase64(image: string) {
    const { data } = await axios.get(image, { responseType: 'arraybuffer' });
    const compressedImageBuffer = await sharp(data)
        .resize({ width: 700 }) // Resize image to a smaller width (adjust as needed)
        .jpeg({ quality: 80 }) // Compress image with JPEG format and quality
        .toBuffer();

    return `data:image/jpeg;base64,${compressedImageBuffer.toString('base64')}`;

}

