import type { PropsWithChildren, ReactNode } from 'react'

type ShopLayoutProps = {
  title: string
  subtitle: string
  action?: ReactNode
}

const ShopLayout = ({ title, subtitle, action, children }: PropsWithChildren<ShopLayoutProps>) => (
  <div className="space-y-8">
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p className="text-sm text-slate-500">Store operations</p>
        <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
        <p className="text-sm text-slate-600">{subtitle}</p>
      </div>
      {action}
    </div>
    {children}
  </div>
)

export default ShopLayout
