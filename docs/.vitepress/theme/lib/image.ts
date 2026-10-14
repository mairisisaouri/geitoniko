/**
 * Μικραίνει τη φωτογραφία και την ξανακωδικοποιεί σε JPEG μέσω canvas.
 * Το re-encode αφαιρεί ΟΛΑ τα EXIF metadata, άρα και το GPS του κινητού,
 * ώστε να μην αποκαλύπτεται πού μένει ο χρήστης.
 */
export async function prepareImage(file: File, maxSide = 1600, quality = 0.82): Promise<Blob> {
  const source = await decode(file)
  const scale = Math.min(1, maxSide / Math.max(source.width, source.height))
  const w = Math.round(source.width * scale)
  const h = Math.round(source.height * scale)

  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  canvas.getContext('2d')!.drawImage(source, 0, 0, w, h)
  if ('close' in source) source.close()

  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('toBlob failed'))), 'image/jpeg', quality),
  )
}

async function decode(file: File): Promise<ImageBitmap | HTMLImageElement> {
  try {
    return await createImageBitmap(file, { imageOrientation: 'from-image' })
  } catch {
    const url = URL.createObjectURL(file)
    try {
      const img = new Image()
      img.src = url
      await img.decode()
      return img
    } finally {
      URL.revokeObjectURL(url)
    }
  }
}
