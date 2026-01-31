import type { FC } from 'react'
import { ArrowUpRight, Boxes, CreditCard, ShoppingCart } from 'lucide-react'
import ShopLayout from './ShopLayout'

const metrics = [
  { label: 'Today’s revenue', value: 'KSh 182,400', helper: '+12% vs yesterday', tone: 'text-emerald-700 bg-emerald-50' },
  { label: 'Open carts', value: '48', helper: 'POS & online combined', tone: 'text-brand-700 bg-brand-50' },
  { label: 'Pending deliveries', value: '7', helper: 'Awaiting rider pickup', tone: 'text-amber-700 bg-amber-50' },
  { label: 'Low stock SKUs', value: '9', helper: 'Prioritize restock', tone: 'text-rose-700 bg-rose-50' },
]

const salesChannels = [
  { name: 'POS terminal', share: '54%', status: 'Live' },
  { name: 'In-store credit', share: '21%', status: 'Healthy' },
  { name: 'Online orders', share: '18%', status: 'Growing' },
  { name: 'Phone orders', share: '7%', status: 'Manual' },
]

const deliveries = [
  { order: '#INV-1042', route: 'CBD → Umoja', window: '10:00 - 11:00 AM', status: 'On the way' },
  { order: '#INV-1043', route: 'Donholm → Pipeline', window: '12:00 - 1:00 PM', status: 'Preparing' },
  { order: '#INV-1044', route: 'Imara → Syokimau', window: '3:00 - 4:00 PM', status: 'Delivered' },
]

const ledger = [
  { customer: 'Mary W.', amount: 'KSh 12,500', status: 'Due today' },
  { customer: 'QuickMart', amount: 'KSh 38,000', status: 'In 3 days' },
  { customer: 'Jirani Stores', amount: 'KSh 22,750', status: 'In 7 days' },
]

const ShopPage: FC = () => (
  <ShopLayout
    title="Shopkeeper workspace"
    subtitle="Monitor POS, online orders, deliveries, and credit in one place."
    action={
      <button className="btn-primary">
        <ArrowUpRight className="h-4 w-4" />
        New order
      </button>
    }
  >
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="flex flex-col gap-2 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-500">{metric.label}</p>
          <p className="text-2xl font-semibold text-slate-900">{metric.value}</p>
          <span className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${metric.tone}`}>{metric.helper}</span>
        </div>
      ))}
    </div>

    <div className="grid gap-6 lg:grid-cols-3">
      <div className="card space-y-4 p-6 lg:col-span-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Sales performance</p>
            <p className="text-lg font-semibold text-slate-900">POS & online</p>
            <p className="text-sm text-slate-600">Compare channels, conversion, and active sessions.</p>
          </div>
          <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">Live</div>
        </div>
        <div className="flex h-52 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-500">
          Chart placeholder — connect sales analytics feed
        </div>
      </div>

      <div className="card space-y-3 p-6">
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-brand-700" />
          <p className="text-lg font-semibold text-slate-900">Sales channels</p>
        </div>
        {salesChannels.map((channel) => (
          <div key={channel.name} className="flex items-center justify-between rounded-xl bg-slate-50 p-3 text-sm">
            <div>
              <p className="font-semibold text-slate-900">{channel.name}</p>
              <p className="text-xs text-slate-600">Share {channel.share}</p>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">{channel.status}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="grid gap-6 lg:grid-cols-3">
      <div className="card space-y-4 p-6 lg:col-span-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Dispatch</p>
            <p className="text-lg font-semibold text-slate-900">Delivery tracker</p>
            <p className="text-sm text-slate-600">Follow orders from prep to proof of delivery.</p>
          </div>
          <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Syncing</div>
        </div>
        <div className="space-y-3">
          {deliveries.map((delivery) => (
            <div key={delivery.order} className="flex items-center justify-between rounded-xl bg-slate-50 p-3 text-sm">
              <div>
                <p className="font-semibold text-slate-900">{delivery.order}</p>
                <p className="text-xs text-slate-600">{delivery.route}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-600">{delivery.window}</p>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  {delivery.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card space-y-3 p-6">
        <div className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-slate-700" />
          <p className="text-lg font-semibold text-slate-900">Credit ledger</p>
        </div>
        {ledger.map((entry) => (
          <div key={entry.customer} className="flex items-center justify-between rounded-xl bg-slate-50 p-3 text-sm">
            <div>
              <p className="font-semibold text-slate-900">{entry.customer}</p>
              <p className="text-xs text-slate-600">{entry.status}</p>
            </div>
            <span className="text-sm font-semibold text-slate-800">{entry.amount}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="card space-y-4 p-6">
      <div className="flex items-center gap-2">
        <Boxes className="h-5 w-5 text-amber-700" />
        <p className="text-lg font-semibold text-slate-900">Inventory alerts</p>
      </div>
      <div className="flex h-48 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-500">
        Inventory heatmap placeholder — connect stock service
      </div>
    </div>
  </ShopLayout>
)

export default ShopPage
