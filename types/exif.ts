export interface DeviceInfo {
  model: string
  brand: string
  software: string
}

export interface CameraSettings {
  focalLength: string
  aperture: string
  shutterSpeed: string
  iso: string
}

export interface MetaData {
  dateTaken: string | null
  dimensions: string
  hasLocation: boolean
}

export interface ExifData {
  device: DeviceInfo
  camera: CameraSettings
  meta: MetaData
}

export interface EditableExif {
  device: DeviceInfo
  camera: CameraSettings
} 