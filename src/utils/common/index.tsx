export function joinClass(...args: Array<string | boolean | undefined>) {
  return args
    .filter(str => typeof str === 'string')
    .join(' ')
    .trim()
}

export function convertToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      const base64Data = reader.result?.toString()?.split(',')?.[1] ?? ''
      resolve(base64Data)
    }

    reader.onerror = error => {
      reject(error)
    }

    reader.readAsDataURL(file)
  })
}

export const isTokenExpired = () => {
  const currentTime = Date.now()
  const tokenExpiration = sessionStorage.getItem('tokenExpiration')
  const tokenExpirationTimestamp = tokenExpiration ? parseInt(tokenExpiration) : 0 // Default to 0 if tokenExpiration is null
  return currentTime > tokenExpirationTimestamp + 1 * 60 * 60 * 1000 // 1 Hour
}

export function convertUrlSourceToFile(src: string, filename?: string): Promise<File> {
  return new Promise<File>((resolve, reject) => {
    fetch(src)
      .then(response => response.blob())
      .then(blob => {
        const name = filename ?? (src.split('/').pop() as string)
        const file = new File([blob], name, { type: blob.type })
        resolve(file)
      })
      .catch(() => {
        reject(new Error(`Failed to load image: ${src}`))
      })
  })
}
