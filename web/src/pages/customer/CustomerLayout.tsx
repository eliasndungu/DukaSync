import type { PropsWithChildren, ReactNode } from 'react'

type CustomerLayoutProps = {
  title: string
  subtitle: string
  action?: ReactNode
}

const CustomerLayout = ({ title, subtitle, action, children }: PropsWithChildren<CustomerLayoutProps>) => (
  <div className="space-y-8">
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p className="text-sm text-slate-500">Customer view</p>
        <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
        <p className="text-sm text-slate-600">{subtitle}</p>
      </div>
      {action}
    </div>
    {children}
  </div>
)

export default CustomerLayout
