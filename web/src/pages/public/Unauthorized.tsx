import { ShieldAlert } from 'lucide-react'
import { Link } from 'react-router-dom'

const Unauthorized = () => {
  const brandName = 'DukaPap'

  return (
    <div className="mx-auto max-w-2xl rounded-2xl bg-white/80 p-10 text-center shadow-sm ring-1 ring-slate-100">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
        <ShieldAlert className="h-7 w-7" />
      </div>
      <h1 className="mt-6 text-3xl font-semibold text-slate-900">Access restricted</h1>
      <p className="mt-3 text-base text-slate-600">
        Your account doesn’t have permission to view this area. If you believe this is a mistake,
        please contact your {brandName} admin to request access.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/dashboard"
          className="inline-flex items-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Go to dashboard
        </Link>
        <Link
          to="/"
          className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Return home
        </Link>
      </div>
    </div>
  )
}

export default Unauthorized
