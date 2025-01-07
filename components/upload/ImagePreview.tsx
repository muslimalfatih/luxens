import Image from 'next/image'
import { ExifData } from '@/types/exif'

interface ImagePreviewProps {
  imageUrl: string
  exifData: ExifData | null
}

export function ImagePreview({ imageUrl, exifData }: ImagePreviewProps) {
  return (
    <div className="max-w-2xl mx-auto py-5 px-4 bg-white">
      <div className="relative aspect-[3/4] w-full mb-4">
        <Image
          src={imageUrl}
          alt="Uploaded photo"
          fill
          className="object-cover rounded-md"
          priority
        />
      </div>
      
      {exifData && (
        <div className="text-sm text-center space-y-1 text-black">
          <p>
            Shot on <span className="font-semibold">{exifData.device.model}</span> {exifData.device.brand}
          </p>
          <p className="text-black">
            {exifData.camera.focalLength}, {exifData.camera.aperture}, {' '}
            {exifData.camera.shutterSpeed}, ISO {exifData.camera.iso}
          </p>
        </div>
      )}
    </div>
  )
} 