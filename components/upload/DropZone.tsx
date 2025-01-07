import { useDropzone } from 'react-dropzone'
import { Card } from '../ui/card'

interface DropZoneProps {
  onDrop: (acceptedFiles: File[]) => void
}

export function DropZone({ onDrop }: DropZoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.heic', '.png']
    },
    maxSize: 10 * 1024 * 1024 // 10MB
  })

  return (
    <Card
      {...getRootProps()}
      className="rounded-lg py-10 bg-transparent border-dashed text-neutral-400 h-full flex items-center justify-center cursor-pointer"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p> 🖼️ Drop your photo here...</p>
      ) : (
        <p> 🖼️ Drag & drop or click to select</p>
      )}
    </Card>
  )
} 