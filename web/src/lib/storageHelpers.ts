const STORAGE_HOST = 'https://firebasestorage.googleapis.com'

export type StorageBucket = string

export const isValidStorageBucket = (bucket: string): boolean => {
  const trimmed = bucket.trim()
  if (!trimmed) return false
  return /^(?!.*\.\.)[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?$/i.test(trimmed)
}

export const normalizeStorageBucket = (bucket?: string | null): StorageBucket | null => {
  if (!bucket) return null

  const trimmed = bucket.trim()
  if (!trimmed) return null

  const normalized = trimmed
    .replace(/^gs:\/\//i, '')
    .replace(/^https?:\/\/firebasestorage\.googleapis\.com\/v0\/b\//i, '')
    .replace(/^https?:\/\/storage\.googleapis\.com\//i, '')
    .replace(/^\/+/, '')

  const candidate = normalized.split(/[/?]/)[0]?.replace(/\/+$/, '')

  if (!candidate || !isValidStorageBucket(candidate)) {
    return null
  }

  return candidate
}

export const buildStorageDownloadUrl = (bucket: string | null | undefined, path: string): string | null => {
  const normalizedBucket = normalizeStorageBucket(bucket)
  const normalizedPath = path.trim().replace(/^\/+/, '')

  if (!normalizedBucket || !normalizedPath) {
    return null
  }

  const encodedPath = encodeURIComponent(normalizedPath)

  return `${STORAGE_HOST}/v0/b/${normalizedBucket}/o/${encodedPath}?alt=media`
}
