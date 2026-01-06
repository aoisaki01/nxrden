import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Validate Cloud Config
        // IMPORTANT: Cloudinary will throw 'Invalid cloud_name' if this is missing,
        // but we want to catch it early to give a better error.
        if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
            return NextResponse.json({
                error: 'Configuration Error: Cloud Name is missing. Please add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME to .env.local'
            }, { status: 500 });
        }

        // Upload to Cloudinary using a Promise wrapper
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: 'norden-store' },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            uploadStream.end(buffer);
        });

        return NextResponse.json({ url: result.secure_url, public_id: result.public_id });
    } catch (error) {
        console.error('Upload Error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
