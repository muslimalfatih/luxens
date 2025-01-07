export interface ExifData {
  device: {
    brand: string
    model: string
    software?: string
  }
  camera: {
    iso: number
    shutterSpeed: string
    aperture: string
    focalLength: string
  }
  meta: {
    dateTaken: string
    dimensions: string
    hasLocation: boolean
  }
  imageUrl: string
}

export interface UploadResponse {
  data: ExifData | null
  error?: string
}

export interface ExifEditorProps {
  data: ExifData
  onSave: (updatedData: ExifData) => void
} 