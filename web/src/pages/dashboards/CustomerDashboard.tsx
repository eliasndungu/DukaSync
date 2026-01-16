import { HeartHandshake, History, Star } from 'lucide-react'

const CustomerDashboard = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="text-sm text-slate-500">Customer view</p>
        <h1 className="text-3xl font-bold text-slate-900">Customers</h1>
        <p className="text-sm text-slate-600">A dedicated area for orders, loyalty, and support.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="card space-y-3 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Engagement</p>
              <p className="text-lg font-semibold text-slate-900">Loyalty</p>
            </div>
            <div className="rounded-xl bg-brand-50 p-3 text-brand-700">
              <Star className="h-5 w-5" />
            </div>
          </div>
          <p className="text-sm text-slate-600">Track rewards, point balances, and referral perks.</p>
        </div>

        <div className="card space-y-3 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Orders</p>
              <p className="text-lg font-semibold text-slate-900">History</p>
            </div>
            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
              <History className="h-5 w-5" />
            </div>
          </div>
          <p className="text-sm text-slate-600">Review past purchases and reorder favorites quickly.</p>
        </div>

        <div className="card space-y-3 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Support</p>
              <p className="text-lg font-semibold text-slate-900">Help desk</p>
            </div>
            <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
              <HeartHandshake className="h-5 w-5" />
            </div>
          </div>
          <p className="text-sm text-slate-600">Raise tickets and chat with shopkeepers for resolutions.</p>
        </div>
      </div>
    </div>
  )
}

export default CustomerDashboard
