import { useApkDownload } from '@/hooks/useApkDownload'

const ApkDownloadButton = () => {
  const { requestDownload, loading, error } = useApkDownload()

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={requestDownload}
        disabled={loading}
        className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? 'Preparing download...' : 'Download Android APK'}
      </button>
      {error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : (
        <p className="text-sm text-slate-500">Opens the latest app build in a new tab.</p>
      )}
    </div>
  )
}

export default ApkDownloadButton
