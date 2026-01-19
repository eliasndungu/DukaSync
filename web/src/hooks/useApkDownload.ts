import { useCallback, useMemo, useState } from 'react'

import { buildStorageDownloadUrl, normalizeStorageBucket } from '@/lib/storageHelpers'

export interface UseApkDownloadOptions {
  apkPath?: string
  bucket?: string
  fallbackUrl?: string
}

export interface UseApkDownloadResult {
  apkUrl: string | null
  loading: boolean
  error: string | null
  requestDownload: () => void
}

const DEFAULT_APK_PATH = import.meta.env.VITE_APK_PATH ?? 'apk/DukaPap.apk'
const ENV_STORAGE_BUCKET =
  import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? import.meta.env.REACT_APP_FIREBASE_STORAGE_BUCKET ?? ''
const ENV_FALLBACK_URL = import.meta.env.VITE_APK_FALLBACK_URL ?? ''

export const useApkDownload = (options?: UseApkDownloadOptions): UseApkDownloadResult => {
  const { apkPath, bucket, fallbackUrl } = options ?? {}
  const [interactionError, setInteractionError] = useState<string | null>(null)
  const resolvedFallbackUrl = fallbackUrl || ENV_FALLBACK_URL || null

  const normalizedBucket = useMemo(
    () => normalizeStorageBucket(bucket ?? ENV_STORAGE_BUCKET),
    [bucket],
  )

  const normalizedPath = useMemo(() => (apkPath ?? DEFAULT_APK_PATH).replace(/^\/+/, ''), [apkPath])

  const apkUrl = useMemo(
    () => (normalizedBucket && normalizedPath ? buildStorageDownloadUrl(normalizedBucket, normalizedPath) : null),
    [normalizedBucket, normalizedPath],
  )

  const baseError = useMemo(() => {
    if (!normalizedBucket) return 'Storage bucket is not configured correctly.'
    if (!normalizedPath) return 'APK path is missing.'
    if (!apkUrl) return 'Unable to build download URL.'
    return null
  }, [apkUrl, normalizedBucket, normalizedPath])

  const error = interactionError ?? baseError
  const loading = false

  const requestDownload = useCallback(() => {
    setInteractionError(null)

    if (baseError) {
      setInteractionError(baseError)
      return
    }

    const target = apkUrl ?? resolvedFallbackUrl

    if (target) {
      const opened = window.open(target, '_blank', 'noopener,noreferrer')
      if (!opened) {
        setInteractionError('Please allow pop-ups to download the app.')
      }
      return
    }

    setInteractionError('APK download is currently unavailable.')
  }, [apkUrl, baseError, resolvedFallbackUrl])

  return {
    apkUrl,
    loading,
    error,
    requestDownload,
  }
}
