import exifr from 'exifr'

export async function extractExif(file: File) {
  try {
    const exif = await exifr.parse(file, {
      pick: [
        'Make',
        'Model',
        'Software',
        'ISO',
        'ExposureTime',
        'FNumber',
        'FocalLength',
        'DateTimeOriginal',
        'ImageWidth',
        'ImageHeight',
        'GPSLatitude',
        'GPSLongitude'
      ]
    })
    
    return {
      device: {
        brand: exif.Make,
        model: exif.Model,
        software: exif.Software
      },
      camera: {
        iso: exif.ISO,
        shutterSpeed: formatShutterSpeed(exif.ExposureTime),
        aperture: `f/${exif.FNumber}`,
        focalLength: `${exif.FocalLength}mm`
      },
      meta: {
        dateTaken: exif.DateTimeOriginal,
        dimensions: `${exif.ImageWidth} × ${exif.ImageHeight}`,
        hasLocation: !!(exif.GPSLatitude && exif.GPSLongitude)
      }
    }
  } catch (error) {
    console.error('EXIF extraction failed:', error)
    return null
  }
}

function formatShutterSpeed(exposureTime: number): string {
  if (!exposureTime) return ''
  if (exposureTime >= 1) return `${exposureTime}s`
  return `1/${Math.round(1/exposureTime)}s`
}
