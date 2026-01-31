import type { PropsWithChildren, ReactNode } from 'react'

type WholesalerLayoutProps = {
  title: string
  subtitle: string
  action?: ReactNode
}

const WholesalerLayout = ({ title, subtitle, action, children }: PropsWithChildren<WholesalerLayoutProps>) => (
  <div className="space-y-8">
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p className="text-sm text-slate-500">Wholesaler command center</p>
        <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
        <p className="text-sm text-slate-600">{subtitle}</p>
      </div>
      {action}
    </div>
    {children}
  </div>
)

export default WholesalerLayout
