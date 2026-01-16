import { BarChart3, LogOut, ShieldCheck } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

const Dashboard = () => {
  const { user, logout } = useAuth()

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">Welcome back</p>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        </div>
        <button onClick={logout} className="btn-secondary">
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Current user</p>
              <p className="text-lg font-semibold text-slate-900">{user?.email ?? 'Anonymous user'}</p>
            </div>
            <div className="rounded-xl bg-brand-50 p-3 text-brand-700">
              <ShieldCheck className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-500">
            Authentication is managed by Firebase Auth and shared through the Context API.
          </p>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Firestore</p>
              <p className="text-lg font-semibold text-slate-900">Connected</p>
            </div>
            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
              <BarChart3 className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-500">
            Ready to store shop data, inventory, and orders. Start wiring your collections.
          </p>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Hosting</p>
              <p className="text-lg font-semibold text-slate-900">Firebase SPA</p>
            </div>
            <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
              <span className="text-xs font-semibold uppercase tracking-wide">SPA</span>
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-500">
            Build with <code className="rounded bg-slate-100 px-1">npm run build</code> then deploy with{' '}
            <code className="rounded bg-slate-100 px-1">firebase deploy</code>.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
