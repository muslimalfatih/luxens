'use client'

import Link from 'next/link'
import { useCallback, useState, useEffect } from 'react'
import { Toaster, toast } from "sonner"
import { ArrowLeftIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { extractExif } from '@/lib/exif'
import { DropZone } from './DropZone'
import { ImagePreview } from './ImagePreview'
import { EditDrawer } from './EditDrawer'
import { ExifData, EditableExif } from '@/types/exif'

export function UploadZone() {
  const [exifData, setExifData] = useState<ExifData | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [editableExif, setEditableExif] = useState<EditableExif>({
    device: { model: '', brand: '', software: '' },
    camera: { focalLength: '', aperture: '', shutterSpeed: '', iso: '' }
  })
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (exifData) {
      setEditableExif({
        device: {
          model: exifData.device.model,
          brand: exifData.device.brand,
          software: exifData.device.software
        },
        camera: {
          focalLength: exifData.camera.focalLength,
          aperture: exifData.camera.aperture,
          shutterSpeed: exifData.camera.shutterSpeed,
          iso: exifData.camera.iso
        }
      })
    }
  }, [exifData])

  const handleSave = () => {
    setExifData({
      ...exifData,
      device: editableExif.device,
      camera: editableExif.camera,
      meta: exifData?.meta || {
        dateTaken: null,
        dimensions: '',
        hasLocation: false
      }
    })
    setOpen(false)
    toast.success("Photo details updated successfully")
  }

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return
    
    try {
      const url = URL.createObjectURL(file)
      setImageUrl(url)
      const exif = await extractExif(file)
      setExifData(exif)
    } catch (error) {
      console.error('Error processing image:', error)
    }
  }, [])

  const handleSaveImage = async () => {
    try {
      const html2canvas = (await import('html2canvas')).default;
      
      // Find the ImagePreview component in the DOM
      const element = document.querySelector('.image-preview-container');
      if (!element) {
        throw new Error('Preview element not found');
      }

      // Create canvas from the entire component
      const canvas = await html2canvas(element as HTMLElement, {
        backgroundColor: 'white',
        scale: 2.5, // Higher scale for better quality
        logging: false,
      });
      
      // Convert to high quality JPEG
      const jpegUrl = canvas.toDataURL('image/jpeg', 1.0);
      
      // Create download link
      const link = document.createElement('a');
      link.href = jpegUrl;
      link.download = 'photo-with-details.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("Image with details saved successfully");
    } catch (error) {
      console.error('Error saving image:', error);
      toast.error("Failed to save image with details");
    }
  };

  return (
    <div className="space-y-4">
      <Toaster position="top-right"/>
      <div className="flex justify-between items-center">
        <Button
          variant="ghost" 
          asChild
          className="text-sm text-neutral-400 hover:text-neutral-100 hover:border hover:border-neutral-100 hover:bg-transparent"
        >
          <Link href="/">
            <ArrowLeftIcon className="w-4 h-4" />
            Back
          </Link>
        </Button>
        {imageUrl && (
          <Button
            variant="ghost"
            className="text-sm text-neutral-400 hover:text-neutral-100 hover:border hover:border-neutral-100 hover:bg-transparent"
            onClick={handleSaveImage}
          >
            Save
          </Button>
        )}
      </div>

      {!imageUrl ? (
        <DropZone onDrop={onDrop} />
      ) : (
        <>
          <ImagePreview imageUrl={imageUrl} exifData={exifData} />
          <div className="flex justify-center items-center">
            <EditDrawer
              open={open}
              onOpenChange={setOpen}
              editableExif={editableExif}
              setEditableExif={setEditableExif}
              onSave={handleSave}
            />
          </div>
        </>
      )}
    </div>
  )
} 