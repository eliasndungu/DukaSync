import { ClipboardList, Coins, ShoppingBag } from 'lucide-react'

const ShopkeeperDashboard = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="text-sm text-slate-500">Store operations</p>
        <h1 className="text-3xl font-bold text-slate-900">Shopkeepers</h1>
        <p className="text-sm text-slate-600">Day-to-day workflows for managing stock and sales.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="card space-y-3 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Inventory</p>
              <p className="text-lg font-semibold text-slate-900">Stock levels</p>
            </div>
            <div className="rounded-xl bg-brand-50 p-3 text-brand-700">
              <ShoppingBag className="h-5 w-5" />
            </div>
          </div>
          <p className="text-sm text-slate-600">Track shelves, pending replenishments, and low-stock alerts.</p>
        </div>

        <div className="card space-y-3 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Orders</p>
              <p className="text-lg font-semibold text-slate-900">Purchase orders</p>
            </div>
            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
              <ClipboardList className="h-5 w-5" />
            </div>
          </div>
          <p className="text-sm text-slate-600">Submit restock requests to wholesalers and follow fulfillment.</p>
        </div>

        <div className="card space-y-3 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Revenue</p>
              <p className="text-lg font-semibold text-slate-900">Sales insights</p>
            </div>
            <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
              <Coins className="h-5 w-5" />
            </div>
          </div>
          <p className="text-sm text-slate-600">Monitor cash flow, discounts, and reconciliation tasks.</p>
        </div>
      </div>
    </div>
  )
}

export default ShopkeeperDashboard
