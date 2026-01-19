import type { FC } from 'react'
import { AlertTriangle, PackageSearch, Receipt, Store, Truck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Metric = {
  label: string
  value: string
  helper: string
  icon: LucideIcon
  tone: string
}

type Delivery = {
  route: string
  window: string
  status: 'En route' | 'Loading' | 'Delivered'
}

const WholesalerDashboard: FC = () => {
  // TODO: Load stats from Firestore
  const metrics: Metric[] = [
    { label: 'Shops served', value: '72', helper: 'Active across 4 regions', icon: Store, tone: 'bg-brand-50 text-brand-700' },
    { label: 'Open invoices', value: '14', helper: 'KSh 1.8M awaiting clearance', icon: Receipt, tone: 'bg-amber-50 text-amber-700' },
    { label: "Today’s deliveries", value: '9', helper: '6 confirmed, 3 en route', icon: Truck, tone: 'bg-emerald-50 text-emerald-700' },
    { label: 'Stock alerts', value: '6', helper: 'Priority SKUs to replenish', icon: AlertTriangle, tone: 'bg-rose-50 text-rose-700' },
  ]

  // TODO: Replace with live dispatch schedule
  const deliveries: Delivery[] = [
    { route: 'CBD → Umoja', window: '9:00 - 10:30 AM', status: 'En route' },
    { route: 'Industrial Area → Fedha', window: '11:00 - 12:00 PM', status: 'Loading' },
    { route: 'Embakasi → Imara Daima', window: '2:00 - 3:00 PM', status: 'Delivered' },
  ]

  // TODO: Pull from inventory forecasting service
  const alerts = [
    { sku: 'Cooking oil 1L', severity: 'Low on hand', icon: PackageSearch },
    { sku: 'Maize flour 2kg', severity: 'Reorder pending approval', icon: PackageSearch },
    { sku: 'Sugar 1kg', severity: 'Lead time 5 days', icon: PackageSearch },
    { sku: 'Rice 5kg', severity: 'New supplier onboarding', icon: PackageSearch },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Supply-side control</p>
          <h1 className="text-3xl font-bold text-slate-900">Wholesaler workspace</h1>
          <p className="text-sm text-slate-600">Coordinate bulk inventory, pricing, and deliveries to shops.</p>
        </div>
        <div className="rounded-full bg-slate-100 px-4 py-2 text-xs font-medium text-slate-700">Next sync in 15m</div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="card relative overflow-hidden rounded-2xl p-5 shadow-sm">
            <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-r from-brand-50/60 via-white to-emerald-50/60" />
            <div className="relative flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wide text-slate-500">{metric.label}</p>
                <p className="text-2xl font-semibold text-slate-900">{metric.value}</p>
                <p className="text-sm text-slate-600">{metric.helper}</p>
              </div>
              <div className={`rounded-xl p-3 ${metric.tone}`}>
                <metric.icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card space-y-4 p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Fulfillment pipeline</p>
              <p className="text-lg font-semibold text-slate-900">Dispatch overview</p>
              <p className="text-sm text-slate-600">Track dispatch windows and received confirmations.</p>
            </div>
            <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">Live</div>
          </div>
          <div className="flex h-52 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-500">
            Chart placeholder — connect analytics feed
          </div>
        </div>

        <div className="card space-y-4 p-6">
          <div className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-emerald-600" />
            <p className="text-lg font-semibold text-slate-900">Today’s deliveries</p>
          </div>
          <div className="space-y-3">
            {deliveries.map((delivery) => (
              <div
                key={delivery.route}
                className="flex items-center justify-between rounded-xl bg-slate-50 p-3 text-sm text-slate-700"
              >
                <div>
                  <p className="font-semibold text-slate-900">{delivery.route}</p>
                  <p className="text-xs text-slate-600">{delivery.window}</p>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  {delivery.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card space-y-4 p-6">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-rose-600" />
          <p className="text-lg font-semibold text-slate-900">Stock alerts</p>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {alerts.map((alert) => (
            <div key={alert.sku} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{alert.sku}</p>
                  <p className="text-xs text-slate-600">{alert.severity}</p>
                </div>
                <div className="rounded-lg bg-rose-50 p-2 text-rose-700">
                  <alert.icon className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WholesalerDashboard
