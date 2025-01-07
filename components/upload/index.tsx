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

  return (
    <div className="space-y-4">
      <Toaster />
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
        {/* TODO: Add save and download functionality. Issue on HEIC files */}
        {imageUrl && (
          <Button
            variant="ghost"
            className="text-sm text-neutral-400 hover:text-neutral-100 hover:border hover:border-neutral-100 hover:bg-transparent"
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