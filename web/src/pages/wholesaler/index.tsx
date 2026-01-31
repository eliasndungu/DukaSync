import type { FC } from 'react'
import { BellRing, CalendarRange, FileText, PackageSearch, Truck } from 'lucide-react'
import WholesalerLayout from './WholesalerLayout'

const quickLinks = [
  { label: 'Inventory', icon: PackageSearch, badge: '6 alerts' },
  { label: 'Dispatch', icon: Truck, badge: 'Live' },
  { label: 'Credit terms', icon: FileText, badge: '2 pending' },
  { label: 'Notice board', icon: BellRing, badge: '3' },
]

const schedule = [
  { route: 'CBD → Umoja', window: '9:00 - 10:30 AM', status: 'En route' },
  { route: 'Industrial Area → Fedha', window: '11:00 - 12:00 PM', status: 'Loading' },
  { route: 'Embakasi → Imara Daima', window: '2:00 - 3:00 PM', status: 'Delivered' },
]

const WholesalerHome: FC = () => (
  <WholesalerLayout
    title="Wholesaler workspace"
    subtitle="Coordinate bulk inventory, pricing, deliveries, and terms for every shop you serve."
    action={
      <button className="btn-primary">
        <CalendarRange className="h-4 w-4" />
        Create dispatch window
      </button>
    }
  >
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {quickLinks.map((item) => (
        <div
          key={item.label}
          className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-brand-50 p-3 text-brand-700">
              <item.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">{item.label}</p>
              <p className="text-xs text-slate-600">Open, monitor, and action tasks</p>
            </div>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{item.badge}</span>
        </div>
      ))}
    </div>

    <div className="grid gap-6 lg:grid-cols-3">
      <div className="card space-y-4 p-6 lg:col-span-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Dispatch overview</p>
            <p className="text-lg font-semibold text-slate-900">Fulfillment pipeline</p>
            <p className="text-sm text-slate-600">Track dispatch windows and received confirmations.</p>
          </div>
          <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Live</div>
        </div>
        <div className="flex h-52 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-500">
          Chart placeholder — connect analytics feed
        </div>
      </div>

      <div className="card space-y-3 p-6">
        <div className="flex items-center gap-2">
          <Truck className="h-5 w-5 text-emerald-600" />
          <p className="text-lg font-semibold text-slate-900">Today’s deliveries</p>
        </div>
        {schedule.map((entry) => (
          <div key={entry.route} className="flex items-center justify-between rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
            <div>
              <p className="font-semibold text-slate-900">{entry.route}</p>
              <p className="text-xs text-slate-600">{entry.window}</p>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">{entry.status}</span>
          </div>
        ))}
      </div>
    </div>
  </WholesalerLayout>
)

export default WholesalerHome
