import { createLogoAction } from "@/actions/logo/logo-actions";
import { s3Client } from "@/lib/s3Client";
import { consumeCredits } from "@/services/user/user-service";
import { PutObjectCommand } from '@aws-sdk/client-s3';
import axios from "axios";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import sharp from "sharp";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
    try {
        const { prompt, title, desc, type, user } = await req.json();
        let imageUrl = '', isPremium = false;

        if (type === "Free") {
            // Get image from Hugging Face
            const response = await axios.post('https://router.huggingface.co/hf-inference/models/strangerzonehf/Flux-Midjourney-Mix2-LoRA',
                prompt,
                {
                    headers: {
                        Authorization: "Bearer " + process.env.NEXT_PUBLIC_HUGGING_FACE_API_KEY,
                        "Content-Type": "application/json",
                    },
                    responseType: "arraybuffer"
                }
            );
            // Process the image and upload to MinIO
            const imageBuffer = Buffer.from(response.data, "binary");
            const storedImageResult = await uploadImageToStorage(imageBuffer, "image/png");

            if (!storedImageResult.success) {
                return NextResponse.json({ error: storedImageResult.error }, { status: 500 });
            }
            isPremium = false;
            imageUrl = storedImageResult.url || "";
        } else {
            console.log(process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN, 999)
            // Get image from Replicate
            const replicate = new Replicate({
                auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN,
                useFileOutput: false
            });

            // Replicate API End point
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

            console.log(output, 3222332);

            if (!output || !output[0]) {
                return NextResponse.json({ error: "Failed to generate image from AI" }, { status: 500 });
            }

            // Save the remote image URL to MinIO
            const imageResult = await processImageUrl(output[0]);

            // Fix: Check if imageResult is a NextResponse (error case) and return it directly
            if (imageResult instanceof NextResponse) {
                return imageResult;
            }

            // Otherwise use the URL from the successful result
            imageUrl = imageResult.url;
            consumeCredits(user.id);
            isPremium = true;
        }

        // Create logo record in database with image URL instead of base64
        const { data, success } = await createLogoAction({
            userEmail: user?.email,
            imageUrl: imageUrl, // Store URL instead of base64
            title: title,
            desc: desc,
            userId: user?.id,
            isPremium
        });

        return NextResponse.json({ image: imageUrl, success: success, error: null });

    } catch (error: any) {
        console.error("Error in logo generation:", error);
        return NextResponse.json({ error: error.response?.data || "Failed to fetch AI response" }, { status: 500 });
    }
}

// Function to upload an image buffer directly to storage
async function uploadImageToStorage(imageBuffer: Buffer, contentType: string) {
    try {
        // Compress image with sharp
        const compressedImageBuffer = await sharp(imageBuffer)
            .resize({ width: 700 }) // Resize image
            .jpeg({ quality: 80 }) // Compress image
            .toBuffer();

        // Generate a unique filename
        const fileExtension = contentType.split('/')[1] === 'jpeg' ? 'jpg' : contentType.split('/')[1] || 'jpg';
        const randomId = uuidv4().replace(/-/g, '').substring(0, 8);
        const newFilename = `${Date.now()}_${randomId}.${fileExtension}`;

        // Upload to MinIO
        const uploadParams = {
            Bucket: process.env.MINIO_BUCKET || '',
            Key: `uploads/${newFilename}`,
            Body: compressedImageBuffer,
            ContentType: 'image/jpeg', // We're converting to JPEG in the compression step
        };

        const command = new PutObjectCommand(uploadParams);
        await s3Client.send(command);

        // Build the complete URL
        const minioEndpoint = process.env.MINIO_ENDPOINT || '';
        const minioBucket = uploadParams.Bucket;

        if (!minioEndpoint || !minioBucket) {
            return {
                success: false,
                error: "Storage configuration is incomplete"
            };
        }

        return {
            success: true,
            url: `${minioEndpoint}/${minioBucket}/${uploadParams.Key}`,
            key: uploadParams.Key
        };
    } catch (error: any) {
        console.error("Image upload error:", error);
        return {
            success: false,
            error: `Failed to upload image: ${error.message}`
        };
    }
}

// Function to process and store an image from a URL
// Modified to always return either a NextResponse or a result object with consistent typing
async function processImageUrl(imageUrl: string): Promise<NextResponse | {
    message: string;
    key: string;
    originalUrl: string;
    newName: string;
    url: string;
    status: number;
}> {
    try {
        // Fetch the image from URL
        const imageResponse = await fetch(imageUrl);

        if (!imageResponse.ok) {
            return NextResponse.json({
                error: `无法获取图片: HTTP ${imageResponse.status}`
            }, { status: 400 });
        }

        // Get content type
        const contentType = imageResponse.headers.get('content-type');
        if (!contentType || !contentType.startsWith('image/')) {
            return NextResponse.json({
                error: `提供的URL不是图片: ${contentType}`
            }, { status: 400 });
        }

        // Get image data
        const imageData = await imageResponse.arrayBuffer();
        const buffer = Buffer.from(imageData);

        // Process image with sharp for resizing/compression
        const compressedImageBuffer = await sharp(buffer)
            .resize({ width: 700 }) // Resize to standard width
            .jpeg({ quality: 80 }) // Compress with JPEG
            .toBuffer();

        // Extract file extension
        const fileExtension = 'jpg'; // We're converting to jpg with sharp

        // Generate a unique filename
        const randomId = uuidv4().replace(/-/g, '').substring(0, 8);
        const newFilename = `${Date.now()}_${randomId}.${fileExtension}`;

        // Upload parameters
        const uploadParams = {
            Bucket: process.env.MINIO_BUCKET || '',
            Key: `uploads/${newFilename}`,
            Body: compressedImageBuffer,
            ContentType: 'image/jpeg',
        };

        // Upload to MinIO
        const command = new PutObjectCommand(uploadParams);
        await s3Client.send(command);

        // Build complete URL
        const minioEndpoint = process.env.MINIO_ENDPOINT || '';
        const minioBucket = uploadParams.Bucket;

        if (!minioEndpoint || !minioBucket) {
            return NextResponse.json({
                error: '存储配置不完整，无法生成URL',
                details: 'Missing endpoint or bucket'
            }, { status: 500 });
        }

        const url = `${minioEndpoint}/${minioBucket}/${uploadParams.Key}`;

        return {
            message: '图片保存成功',
            key: uploadParams.Key,
            originalUrl: imageUrl,
            newName: newFilename,
            url: url,
            status: 200
        };
    } catch (error: any) {
        console.error('URL处理错误:', error);
        return NextResponse.json({
            error: '无效的图片URL',
            details: error.message
        }, { status: 400 });
    }
}