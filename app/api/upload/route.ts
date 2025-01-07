import { NextResponse } from 'next/server'
import { extractExif } from '@/lib/exif'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    const exifData = await extractExif(file)
    
    return NextResponse.json({ data: exifData })
  } catch (error: unknown) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to process image' },
      { status: 500 }
    )
  }
} 