import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';


// Initialize S3 client (MinIO)
const s3Client = new S3Client({
    endpoint: process.env.MINIO_ENDPOINT,
    region: 'us-east-1', // This is required but can be any value for MinIO
    credentials: {
        accessKeyId: process.env.MINIO_USER || '',
        secretAccessKey: process.env.MINIO_PASSWORD || '',
    },
    forcePathStyle: true, // Required for MinIO compatibility
});

export { s3Client }