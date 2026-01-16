import { PackageSearch, ShoppingCart, Truck } from 'lucide-react'

const WholesalerDashboard = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="text-sm text-slate-500">Supply-side control</p>
        <h1 className="text-3xl font-bold text-slate-900">Wholesalers</h1>
        <p className="text-sm text-slate-600">Coordinate bulk inventory, pricing, and deliveries to shops.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="card space-y-3 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Catalog</p>
              <p className="text-lg font-semibold text-slate-900">Products</p>
            </div>
            <div className="rounded-xl bg-brand-50 p-3 text-brand-700">
              <PackageSearch className="h-5 w-5" />
            </div>
          </div>
          <p className="text-sm text-slate-600">Prepare SKUs, minimum order quantities, and bulk price tiers.</p>
        </div>

        <div className="card space-y-3 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Orders</p>
              <p className="text-lg font-semibold text-slate-900">Purchase flows</p>
            </div>
            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
              <ShoppingCart className="h-5 w-5" />
            </div>
          </div>
          <p className="text-sm text-slate-600">Handle shopkeeper purchase orders and reconcile invoices.</p>
        </div>

        <div className="card space-y-3 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Logistics</p>
              <p className="text-lg font-semibold text-slate-900">Deliveries</p>
            </div>
            <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
              <Truck className="h-5 w-5" />
            </div>
          </div>
          <p className="text-sm text-slate-600">Track dispatches, delivery windows, and received confirmations.</p>
        </div>
      </div>
    </div>
  )
}

export default WholesalerDashboard
