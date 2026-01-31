import type { FC } from 'react'
import { BadgeCheck, CalendarRange, Heart, Package, Truck } from 'lucide-react'
import CustomerLayout from './CustomerLayout'

const metrics = [
  { label: 'Active orders', value: '3', helper: '2 deliveries today', tone: 'bg-brand-50 text-brand-700' },
  { label: 'Loyalty points', value: '1,240', helper: 'Redeemable now', tone: 'bg-emerald-50 text-emerald-700' },
  { label: 'Refunds', value: '0', helper: 'Last 30 days', tone: 'bg-slate-100 text-slate-700' },
  { label: 'Support tickets', value: '1', helper: 'Awaiting response', tone: 'bg-amber-50 text-amber-700' },
]

const orders = [
  { id: '#ORD-2314', eta: 'Today 1:00 PM', items: 'Household, snacks', status: 'On the way' },
  { id: '#ORD-2315', eta: 'Tomorrow 10:00 AM', items: 'Fresh produce', status: 'Scheduled' },
  { id: '#ORD-2316', eta: 'Today 5:00 PM', items: 'Beverages', status: 'Preparing' },
]

const favorites = [
  { name: 'Everyday Shop', distance: '1.2 km' },
  { name: 'Fresh Basket', distance: '2.1 km' },
  { name: 'Corner Grocer', distance: '0.9 km' },
]

const support = [
  { subject: 'Missing item', status: 'Open', updated: '2h ago' },
  { subject: 'Payment inquiry', status: 'Resolved', updated: 'Yesterday' },
]

const CustomerPage: FC = () => (
  <CustomerLayout
    title="Customer workspace"
    subtitle="Track orders, deliveries, and loyalty in one place."
    action={
      <button className="btn-primary">
        <CalendarRange className="h-4 w-4" />
        Schedule delivery
      </button>
    }
  >
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-500">{metric.label}</p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">{metric.value}</p>
          <p className="mt-1 text-sm text-slate-600">{metric.helper}</p>
          <span className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${metric.tone}`}>Status</span>
        </div>
      ))}
    </div>

    <div className="grid gap-6 lg:grid-cols-3">
      <div className="card space-y-4 p-6 lg:col-span-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Deliveries</p>
            <p className="text-lg font-semibold text-slate-900">Your orders</p>
            <p className="text-sm text-slate-600">Live updates for active and scheduled deliveries.</p>
          </div>
          <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Live</div>
        </div>
        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order.id} className="flex items-center justify-between rounded-xl bg-slate-50 p-4 text-sm">
              <div>
                <p className="font-semibold text-slate-900">{order.id}</p>
                <p className="text-xs text-slate-600">{order.items}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-600">{order.eta}</p>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card space-y-3 p-6">
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-rose-600" />
          <p className="text-lg font-semibold text-slate-900">Favorite shops</p>
        </div>
        {favorites.map((shop) => (
          <div key={shop.name} className="flex items-center justify-between rounded-xl bg-slate-50 p-3 text-sm">
            <div className="flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-brand-700" />
              <div>
                <p className="font-semibold text-slate-900">{shop.name}</p>
                <p className="text-xs text-slate-600">{shop.distance} away</p>
              </div>
            </div>
            <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">Preferred</span>
          </div>
        ))}
      </div>
    </div>

    <div className="grid gap-6 lg:grid-cols-3">
      <div className="card space-y-4 p-6">
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5 text-brand-700" />
          <p className="text-lg font-semibold text-slate-900">Order history</p>
        </div>
        <div className="flex h-48 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-500">
          Order history placeholder — connect order feed
        </div>
      </div>

      <div className="card space-y-3 p-6 lg:col-span-2">
        <div className="flex items-center gap-2">
          <Truck className="h-5 w-5 text-emerald-700" />
          <p className="text-lg font-semibold text-slate-900">Support</p>
        </div>
        {support.map((ticket) => (
          <div key={ticket.subject} className="flex items-center justify-between rounded-xl bg-slate-50 p-3 text-sm">
            <div>
              <p className="font-semibold text-slate-900">{ticket.subject}</p>
              <p className="text-xs text-slate-600">Updated {ticket.updated}</p>
            </div>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">{ticket.status}</span>
          </div>
        ))}
      </div>
    </div>
  </CustomerLayout>
)

export default CustomerPage
