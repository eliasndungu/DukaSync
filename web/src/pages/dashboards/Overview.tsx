import { Link } from 'react-router-dom'
import { BarChart3, Building2, LogOut, PackageSearch, ShieldCheck, ShoppingBag, Users } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

const workspaces = [
  {
    title: 'Admin workspace',
    description: 'Executive overview, approvals, and governance.',
    href: '/dashboard/admin',
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    title: 'Wholesalers',
    description: 'Bulk inventory coordination and supplier terms.',
    href: '/dashboard/wholesalers',
    icon: <PackageSearch className="h-5 w-5" />,
  },
  {
    title: 'Shopkeepers',
    description: 'Store operations, stock levels, and sales flows.',
    href: '/dashboard/shopkeepers',
    icon: <ShoppingBag className="h-5 w-5" />,
  },
  {
    title: 'Customers',
    description: 'Order history, loyalty, and support touchpoints.',
    href: '/dashboard/customers',
    icon: <Users className="h-5 w-5" />,
  },
]

const Overview = () => {
  const { user, logout } = useAuth()

  return (
    <section className="space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">Welcome back</p>
          <h1 className="text-3xl font-bold text-slate-900">Workspace hub</h1>
          <p className="mt-1 text-sm text-slate-600">
            Organized entry points for admins, wholesalers, shopkeepers, and customers.
          </p>
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
            Your session is protected with layered checks and mindful alerts.
          </p>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Store heartbeat</p>
              <p className="text-lg font-semibold text-slate-900">Steady</p>
            </div>
            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
              <BarChart3 className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-500">
            Inventory, sales, and community signals stay synchronized so your team can act quickly.
          </p>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Experience</p>
              <p className="text-lg font-semibold text-slate-900">Smooth & current</p>
            </div>
            <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
              <span className="text-xs font-semibold uppercase tracking-wide">SPA</span>
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-500">
            Updates roll out quietly so shop owners stay focused on customers, not commands.
          </p>
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Roles</p>
            <h2 className="text-2xl font-bold text-slate-900">Choose a workspace</h2>
            <p className="text-slate-600">
              Dedicated routes for admins, wholesalers, shopkeepers, and customers to keep responsibilities clear.
            </p>
          </div>
          <Link to="/" className="btn-secondary">
            Back to home
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {workspaces.map((workspace) => (
            <Link
              key={workspace.title}
              to={workspace.href}
              className="group rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md"
            >
              <div className="mb-3 inline-flex rounded-lg bg-brand-50 p-2 text-brand-700">{workspace.icon}</div>
              <p className="text-base font-semibold text-slate-900">{workspace.title}</p>
              <p className="mt-1 text-sm text-slate-600">{workspace.description}</p>
              <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-brand-700">
                Open workspace
              </span>
            </Link>
          ))}
        </div>
      </section>
    </section>
  )
}

export default Overview
