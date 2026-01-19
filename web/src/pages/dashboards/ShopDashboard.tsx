import type { FC } from 'react'
import { AlertTriangle, Handshake, Receipt, Truck, Warehouse } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Metric = {
  label: string
  value: string
  helper: string
  icon: LucideIcon
  tone: string
}

const ShopDashboard: FC = () => {
  // TODO: Load stats from Firestore
  const metrics: Metric[] = [
    { label: 'Suppliers', value: '8', helper: 'Preferred & active', icon: Handshake, tone: 'bg-brand-50 text-brand-700' },
    { label: 'Recent deliveries', value: '3', helper: 'Last 24 hours', icon: Truck, tone: 'bg-emerald-50 text-emerald-700' },
    { label: 'Stock low', value: '5 SKUs', helper: 'Needs replenishment', icon: AlertTriangle, tone: 'bg-amber-50 text-amber-700' },
    { label: 'Outstanding balances', value: 'KSh 148k', helper: 'Due this week', icon: Receipt, tone: 'bg-slate-100 text-slate-700' },
  ]

  // TODO: Replace with real supplier directory data
  const suppliers = [
    { name: 'Prime Foods', category: 'Dry goods', sla: '24h' },
    { name: 'FreshMart', category: 'Perishables', sla: 'Same day' },
    { name: 'BulkCo', category: 'Beverages', sla: '48h' },
  ]

  // TODO: Fetch low stock SKUs from inventory service
  const lowStock = [
    { item: 'Cooking oil 1L', remaining: '12 bottles' },
    { item: 'Sugar 1kg', remaining: '18 bags' },
    { item: 'Maize flour 2kg', remaining: '25 bags' },
  ]

  // TODO: Pull balances from accounting backend
  const balances = [
    { supplier: 'Prime Foods', amount: 'KSh 52,000', due: 'Today' },
    { supplier: 'BulkCo', amount: 'KSh 61,500', due: 'In 2 days' },
    { supplier: 'FreshMart', amount: 'KSh 34,500', due: 'In 5 days' },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Store operations</p>
          <h1 className="text-3xl font-bold text-slate-900">Shopkeeper workspace</h1>
          <p className="text-sm text-slate-600">Track suppliers, deliveries, and replenishment tasks.</p>
        </div>
        <div className="rounded-full bg-slate-100 px-4 py-2 text-xs font-medium text-slate-700">End of day in 5h</div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="card relative overflow-hidden rounded-2xl p-5 shadow-sm">
            <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-r from-brand-50/60 via-white to-amber-50/50" />
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
              <p className="text-sm text-slate-500">Inbound</p>
              <p className="text-lg font-semibold text-slate-900">Delivery timeline</p>
              <p className="text-sm text-slate-600">Recent drop-offs and expected arrival windows.</p>
            </div>
            <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">On track</div>
          </div>
          <div className="flex h-52 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-500">
            Chart placeholder — plug into delivery events feed
          </div>
        </div>

        <div className="card space-y-4 p-6">
          <div className="flex items-center gap-2">
            <Warehouse className="h-5 w-5 text-brand-700" />
            <p className="text-lg font-semibold text-slate-900">Suppliers</p>
          </div>
          <div className="space-y-3">
            {suppliers.map((supplier) => (
              <div key={supplier.name} className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{supplier.name}</p>
                  <p className="text-xs text-slate-600">{supplier.category}</p>
                </div>
                <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">
                  SLA {supplier.sla}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card space-y-4 p-6">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <p className="text-lg font-semibold text-slate-900">Stock low</p>
          </div>
          <div className="space-y-3">
            {lowStock.map((item) => (
              <div key={item.item} className="flex items-center justify-between rounded-xl bg-amber-50/60 p-3 text-sm">
                <p className="font-semibold text-slate-900">{item.item}</p>
                <span className="text-xs font-semibold text-amber-700">{item.remaining}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card space-y-4 p-6 lg:col-span-2">
          <div className="flex items-center gap-2">
            <Receipt className="h-5 w-5 text-slate-700" />
            <p className="text-lg font-semibold text-slate-900">Outstanding balances</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {balances.map((balance) => (
              <div key={balance.supplier} className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{balance.supplier}</p>
                  <p className="text-xs text-slate-600">Due {balance.due}</p>
                </div>
                <span className="text-sm font-semibold text-slate-800">{balance.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopDashboard
