import { useAuth } from '@/context/AuthContext'
import { Building2, CheckCircle2, ShieldCheck, Users } from 'lucide-react'

const AdminDashboard = () => {
  const { user } = useAuth()

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Executive view</p>
          <h1 className="text-3xl font-bold text-slate-900">Admin workspace</h1>
          <p className="text-sm text-slate-600">For founders to oversee teams, data, and approvals.</p>
        </div>
        <div className="rounded-full bg-slate-100 px-4 py-2 text-xs font-medium text-slate-700">
          {user?.email ?? 'Admin user'}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="card space-y-3 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Compliance</p>
              <p className="text-lg font-semibold text-slate-900">Access control</p>
            </div>
            <div className="rounded-xl bg-brand-50 p-3 text-brand-700">
              <ShieldCheck className="h-5 w-5" />
            </div>
          </div>
          <p className="text-sm text-slate-600">
            Manage permissions for wholesalers, shopkeepers, and customer support roles.
          </p>
        </div>

        <div className="card space-y-3 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">People</p>
              <p className="text-lg font-semibold text-slate-900">Teams & invites</p>
            </div>
            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <p className="text-sm text-slate-600">Invite co-founders and assign collaborators to workspaces.</p>
        </div>

        <div className="card space-y-3 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Operations</p>
              <p className="text-lg font-semibold text-slate-900">Approvals</p>
            </div>
            <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
          <p className="text-sm text-slate-600">Track high-impact changes that need founder sign-off.</p>
        </div>
      </div>

      <div className="card flex items-center gap-4 p-6">
        <div className="rounded-2xl bg-brand-50 p-4 text-brand-700">
          <Building2 className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">Governance-first</p>
          <p className="text-sm text-slate-600">
            This workspace is the source of truth for strategic actions while other routes stay focused on execution.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
