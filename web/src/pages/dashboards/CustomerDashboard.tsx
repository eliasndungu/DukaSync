import type { FC } from 'react'
import { ArrowRight, HeartHandshake, History, Star, Store } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Metric = {
  label: string
  value: string
  helper: string
  icon: LucideIcon
  tone: string
}

const CustomerDashboard: FC = () => {
  // TODO: Load stats from Firestore
  const metrics: Metric[] = [
    { label: 'Recent orders', value: '3', helper: 'Delivered this week', icon: History, tone: 'bg-emerald-50 text-emerald-700' },
    { label: 'Recommended shops', value: '4', helper: 'Based on your area', icon: Store, tone: 'bg-brand-50 text-brand-700' },
    { label: 'Loyalty points', value: '1,250', helper: 'Ready to redeem', icon: Star, tone: 'bg-amber-50 text-amber-700' },
  ]

  // TODO: Replace with personalized orders
  const orders = [
    { id: 'DP-2031', shop: 'FreshMart', total: 'KSh 2,450', status: 'Delivered' },
    { id: 'DP-2028', shop: 'BulkCo', total: 'KSh 1,980', status: 'On the way' },
    { id: 'DP-2024', shop: 'CornerShop', total: 'KSh 730', status: 'Delivered' },
  ]

  // TODO: Fetch recommendations from backend service
  const recommendations = [
    { name: 'Prime Foods', specialty: 'Dry goods & staples' },
    { name: 'Daily Dairy', specialty: 'Milk & yoghurt' },
    { name: 'Hydrate', specialty: 'Beverages' },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Customer view</p>
          <h1 className="text-3xl font-bold text-slate-900">Shopping hub</h1>
          <p className="text-sm text-slate-600">Track your orders, loyalty, and explore nearby shops.</p>
        </div>
        <div className="rounded-full bg-slate-100 px-4 py-2 text-xs font-medium text-slate-700">Signed in</div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <div key={metric.label} className="card relative overflow-hidden rounded-2xl p-5 shadow-sm">
            <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-r from-brand-50/60 via-white to-emerald-50/50" />
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
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-emerald-700" />
            <p className="text-lg font-semibold text-slate-900">Recent orders</p>
          </div>
          <div className="space-y-3">
            {orders.map((order) => (
              <div key={order.id} className="flex items-center justify-between rounded-xl bg-slate-50 p-3 text-sm">
                <div>
                  <p className="font-semibold text-slate-900">{order.id}</p>
                  <p className="text-xs text-slate-600">{order.shop}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-900">{order.total}</p>
                  <p className="text-xs text-emerald-700">{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card space-y-4 p-6">
          <div className="flex items-center gap-2">
            <HeartHandshake className="h-5 w-5 text-brand-700" />
            <p className="text-lg font-semibold text-slate-900">Recommended shops</p>
          </div>
          <div className="space-y-3">
            {recommendations.map((shop) => (
              <div key={shop.name} className="rounded-xl bg-slate-50 p-3">
                <p className="text-sm font-semibold text-slate-900">{shop.name}</p>
                <p className="text-xs text-slate-600">{shop.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card relative overflow-hidden p-6">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-50 via-white to-emerald-50" />
        <div className="relative flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm text-slate-600">Shop the catalog</p>
            <p className="text-xl font-semibold text-slate-900">Browse curated essentials</p>
            <p className="text-sm text-slate-600">Jump into the marketplace and add items to your cart.</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700">
            Browse catalog
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CustomerDashboard
