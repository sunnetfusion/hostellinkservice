
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const fileBuffer = await file.arrayBuffer();

    const watermarkText = 'HostelLink';
    const watermarkBuffer = await sharp({
        create: {
            width: 400,
            height: 100,
            channels: 4,
            background: { r: 0, g: 0, b: 0, alpha: 0 }
        }
    })
    .composite([{
        input: Buffer.from(`<svg><text x="0" y="50" font-family="Arial" font-size="48" fill="white" opacity="0.5">${watermarkText}</text></svg>`),
        gravity: 'center'
    }])
    .toBuffer();


    const watermarkedBuffer = await sharp(fileBuffer)
      .composite([
        {
          input: watermarkBuffer,
          gravity: 'southeast',
        },
      ])
      .toBuffer();

    const filePath = `hostel-photos/${uuidv4()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from('hostel-images')
      .upload(filePath, watermarkedBuffer, {
        contentType: file.type,
      });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { publicUrl } = supabase.storage.from('hostel-images').getPublicUrl(filePath).data;

    return NextResponse.json({ url: publicUrl }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
