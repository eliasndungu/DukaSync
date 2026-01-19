import { useRef, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  BarChart3,
  Boxes,
  CheckCircle2,
  FileSpreadsheet,
  Link2,
  Loader2,
  Mail,
  Code2,
  Briefcase,
  Plug,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  Users,
} from 'lucide-react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { firestore } from '@/firebaseConfig'
import ApkDownloadButton from '@/components/ApkDownloadButton'

type ContactFormData = {
  name: string
  email: string
  company: string
  message: string
}

const TARGET_INBOX = 'dukapap-founder'
const MIN_ORDER_BAR_HEIGHT = 8
const MAX_STOCK_MOVEMENT = 480
const API_INTEGRATIONS_PROGRESS = 86
const FOUNDER_EMAIL = 'founders@dukapap.com'

const roleBenefits = [
  {
    title: 'Wholesalers',
    description: 'Publish price lists once, sync deliveries, and auto-match invoices across every shop you serve.',
    bullets: ['API bridge into existing ERP/POS', 'Delivery receipts auto-create invoices', 'Stock-outs flagged before routes leave'],
    icon: <Store className="h-6 w-6 text-brand-700" />,
  },
  {
    title: 'Shopkeepers',
    description: 'Receive deliveries without retyping. Inventory and retail prices stay aligned with supplier updates.',
    bullets: ['One-click receiving with variance checks', 'Retail labels refresh when price lists change', 'Daily close with synced sales + purchase totals'],
    icon: <ShoppingBag className="h-6 w-6 text-brand-700" />,
  },
  {
    title: 'Customers',
    description: 'Browse trusted shops, reserve stock, and place orders with the same catalog wholesalers publish.',
    bullets: ['Live availability from nearby shops', 'Transparent delivery windows', 'Receipts sent instantly'],
    icon: <Users className="h-6 w-6 text-brand-700" />,
  },
]

const syncSteps = [
  {
    title: 'Connect your systems',
    description: 'Secure API connectors link DukaPap with your current POS or ERP—no migrations required.',
    icon: <Plug className="h-5 w-5 text-brand-700" />,
  },
  {
    title: 'Automate deliveries',
    description: 'Deliveries create draft invoices and update stock at both wholesaler and shop levels in real time.',
    icon: <Boxes className="h-5 w-5 text-brand-700" />,
  },
  {
    title: 'Reconcile and grow',
    description: 'Invoice matches and stock movements roll into dashboards so finance, ops, and sales stay aligned.',
    icon: <BarChart3 className="h-5 w-5 text-brand-700" />,
  },
]

const aiJourneys = [
  {
    title: 'Wholesaler copilot',
    description: 'Predictive replenishment watches routes and price lists, keeping branches aligned automatically.',
    accent: 'from-emerald-300 via-brand-400 to-indigo-400',
    icon: <Store className="h-5 w-5 text-white" />,
    signal: 'Live route tuning',
  },
  {
    title: 'Shopkeeper assistant',
    description: 'Receipts, labels, and variances are suggested in real time so shelves match incoming deliveries.',
    accent: 'from-amber-300 via-emerald-300 to-brand-500',
    icon: <ShoppingBag className="h-5 w-5 text-white" />,
    signal: 'Auto-balanced shelves',
  },
  {
    title: 'Customer concierge',
    description: 'AI drafts promised delivery windows, reserves inventory, and shares receipts instantly.',
    accent: 'from-indigo-300 via-brand-400 to-emerald-300',
    icon: <Users className="h-5 w-5 text-white" />,
    signal: 'Predictive availability',
  },
]

const LandingPage: React.FC = () => {
  const navigate = useNavigate()
  const wholesalersRef = useRef<HTMLDivElement | null>(null)
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const ordersTrend = [72, 88, 104, 118, 135]
  const invoiceMatch = [
    { label: 'Auto-matched', value: 92 },
    { label: 'Needs review', value: 6 },
    { label: 'Exceptions', value: 2 },
  ]
  const stockMovements = [
    { label: 'Received', amount: 420 },
    { label: 'Transferred', amount: 260 },
    { label: 'Sold', amount: 380 },
  ]

  const maxOrderValue = Math.max(...ordersTrend)

  const handleScrollToWholesalers = () => {
    wholesalersRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('loading')
    try {
      await addDoc(collection(firestore, 'visitorMessages'), {
        ...formData,
        targetInbox: TARGET_INBOX,
        createdAt: serverTimestamp(),
      })
      setStatus('success')
      setFormData({ name: '', email: '', company: '', message: '' })
    } catch (error) {
      console.error('Failed to send visitor message', error)
      setStatus('error')
    }
  }

  return (
    <div className="space-y-16">
      <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">
            <Sparkles className="h-4 w-4" />
            Wholesale sync OS
          </span>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Eliminate manual re-entry between wholesalers and shops.
            </h1>
            <p className="text-lg text-slate-600">
              DukaPap keeps deliveries, invoices, and stock movements in lockstep across your ecosystem. API-ready for
              the POS or ERP you already use.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-brand-700">
            <a href="#features" className="rounded-full bg-brand-50 px-3 py-1 hover:text-brand-800">
              Features
            </a>
            <a href="#pricing" className="rounded-full bg-brand-50 px-3 py-1 hover:text-brand-800">
              Pricing
            </a>
            <a href="#docs" className="rounded-full bg-brand-50 px-3 py-1 hover:text-brand-800">
              API Docs
            </a>
            <a href="#careers" className="rounded-full bg-brand-50 px-3 py-1 hover:text-brand-800">
              Careers
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={() => navigate('/login')} className="btn-primary">
              Launch console
              <ArrowRight className="h-4 w-4" />
            </button>
            <button onClick={handleScrollToWholesalers} className="btn-secondary">
              Explore DukaPap for wholesalers
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-100 bg-white/80 p-4 shadow-sm">
              <p className="text-sm text-slate-500">Orders auto-synced</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">18,240</p>
              <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
                <CheckCircle2 className="h-4 w-4" />
                +8.4% vs last week
              </span>
            </div>
            <div className="rounded-xl border border-slate-100 bg-white/80 p-4 shadow-sm">
              <p className="text-sm text-slate-500">Invoices matched</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">97%</p>
              <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-amber-700">
                <FileSpreadsheet className="h-4 w-4" />
                Audit-ready trails
              </span>
            </div>
            <div className="rounded-xl border border-slate-100 bg-white/80 p-4 shadow-sm">
              <p className="text-sm text-slate-500">Stock alerts prevented</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">312</p>
              <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-brand-700">
                <ShieldCheck className="h-4 w-4" />
                Balanced routes
              </span>
            </div>
          </div>
        </div>

        <div className="card p-6 sm:p-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <Link2 className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Sync health</p>
                  <p className="text-lg font-semibold text-slate-900">Orders • Invoices • Stock</p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                Real-time
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-900">Order velocity</p>
                  <span className="text-xs font-medium text-emerald-700">+12% synced</span>
                </div>
                <div className="mt-4 flex h-28 items-end gap-2">
                  {ordersTrend.map((value, index) => (
                    <div key={value} className="flex-1 rounded-md bg-indigo-100">
                      <div
                        className="rounded-md bg-gradient-to-t from-brand-600 to-indigo-400"
                        style={{ height: `${Math.max(MIN_ORDER_BAR_HEIGHT, (value / maxOrderValue) * 100)}%` }}
                      />
                      <p className="mt-2 text-center text-[11px] text-slate-500">W{index + 1}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-900">Invoice harmony</p>
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="mt-3 space-y-3">
                  {invoiceMatch.map((item) => (
                    <div key={item.label} className="space-y-1">
                      <div className="flex items-center justify-between text-sm text-slate-600">
                        <span>{item.label}</span>
                        <span className="font-semibold text-slate-900">{item.value}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-brand-600 to-indigo-400"
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-dashed border-brand-200 bg-brand-50/60 p-4 text-sm text-brand-800">
              DukaPap bridges wholesalers, shopkeepers, and customers so every order, invoice, and stock move is trusted
              and synced.
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-3xl border border-indigo-100 bg-slate-900 px-6 py-8 text-white shadow-card">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-16 top-10 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute bottom-0 right-6 h-32 w-32 animate-pulse rounded-full bg-emerald-400/20 blur-2xl" />
        </div>
        <div className="relative grid gap-8 lg:grid-cols-3">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-200">
              <Sparkles className="h-4 w-4" />
              AI retail copilot
            </div>
            <h2 className="text-3xl font-bold leading-tight">See how every role feels with DukaPap AI</h2>
            <p className="text-sm text-slate-200">
              Our models listen to deliveries, invoices, and customer intent to stage the next best action for wholesalers,
              shopkeepers, and shoppers.
            </p>
            <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                  <Link2 className="h-5 w-5 text-emerald-200" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Real-time signal graph</p>
                  <p className="text-xs text-slate-200">Orders, invoices, and stock move in unison with gentle AI nudges.</p>
                </div>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-5/6 animate-pulse bg-gradient-to-r from-emerald-300 via-brand-400 to-indigo-400" />
              </div>
              <div className="rounded-xl border border-white/10 bg-white text-slate-900 shadow-sm">
                <div className="flex items-center justify-between px-4 pt-4">
                  <div>
                    <p className="text-sm font-semibold">Try the mobile app</p>
                    <p className="text-xs text-slate-600">Walk the AI-assisted workflow anywhere.</p>
                  </div>
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold text-brand-700">Android</span>
                </div>
                <div className="px-4 pb-4">
                  <ApkDownloadButton />
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:col-span-2">
            {aiJourneys.map((journey) => (
              <div
                key={journey.title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 shadow-md transition hover:-translate-y-1 hover:border-white/30 hover:shadow-lg"
              >
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/10 blur-2xl transition group-hover:scale-110" />
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">{journey.icon}</div>
                  <span className="text-xs font-semibold text-emerald-200">{journey.signal}</span>
                </div>
                <p className="mt-3 text-lg font-semibold">{journey.title}</p>
                <p className="mt-2 text-sm text-slate-200">{journey.description}</p>
                <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div className={'h-full w-3/4 animate-pulse bg-gradient-to-r ' + journey.accent} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" ref={wholesalersRef} className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Built for every role</p>
            <h2 className="text-2xl font-bold text-slate-900">Wholesalers, shopkeepers, and customers stay aligned</h2>
            <p className="text-slate-600">
              One canvas to publish price lists, receive deliveries, and create customer-grade shopping journeys without
              duplicating data.
            </p>
          </div>
          <button onClick={() => navigate('/login')} className="btn-secondary">
            Launch console
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {roleBenefits.map((benefit) => (
            <div
              key={benefit.title}
              className="group rounded-2xl border border-slate-100 bg-white/90 p-5 shadow-sm transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
            >
              <div className="mb-3 inline-flex rounded-xl bg-brand-50 p-3 text-brand-700">{benefit.icon}</div>
              <p className="text-lg font-semibold text-slate-900">{benefit.title}</p>
              <p className="mt-2 text-sm text-slate-600">{benefit.description}</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {benefit.bullets.map((point) => (
                  <li key={point} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-slate-100 bg-white/90 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">How sync works</p>
                <h3 className="text-xl font-bold text-slate-900">From API connection to daily calm</h3>
              </div>
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-brand-700">
                POS & ERP ready
              </span>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {syncSteps.map((step, index) => (
                <div key={step.title} className="relative rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                  {index < syncSteps.length - 1 && (
                    <div className="absolute right-0 top-1/2 hidden h-px w-10 -translate-y-1/2 bg-slate-200 md:block" />
                  )}
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                    {step.icon}
                  </div>
                  <p className="mt-3 text-base font-semibold text-slate-900">{step.title}</p>
                  <p className="mt-2 text-sm text-slate-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-100 bg-white/90 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">Stock movements</p>
              <Boxes className="h-4 w-4 text-brand-700" />
            </div>
            <div className="mt-4 space-y-3">
              {stockMovements.map((movement) => (
                <div key={movement.label} className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">{movement.label}</span>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand-600 to-indigo-500"
                      style={{ width: `${Math.min(100, (movement.amount / MAX_STOCK_MOVEMENT) * 100)}%` }}
                    />
                    </div>
                    <span className="font-semibold text-slate-900">{movement.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div id="pricing" className="rounded-2xl border border-dashed border-amber-200 bg-amber-50/80 p-5 shadow-sm">
            <p className="text-sm font-semibold text-amber-800">Pricing note</p>
            <p className="mt-2 text-sm text-amber-900">
              Start with a founder plan while we integrate your POS or ERP. Pay as your routes, branches, and customers
              go live—no per-seat surprises.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-100 bg-white/90 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Contact</p>
              <h3 className="text-xl font-bold text-slate-900">Message the founders</h3>
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            Share your current workflow and we will tailor a sync plan. Messages land directly in the DukaPap founder
            inbox.
          </p>
          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <label htmlFor="name" className="text-sm font-medium text-slate-700">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                  placeholder="Jane Doe"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="email" className="text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                  placeholder="you@company.com"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label htmlFor="company" className="text-sm font-medium text-slate-700">
                Company
              </label>
              <input
                id="company"
                name="company"
                value={formData.company}
                onChange={(event) => setFormData((prev) => ({ ...prev, company: event.target.value }))}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                placeholder="Wholesaler or shop name"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="message" className="text-sm font-medium text-slate-700">
                What are you hoping to sync?
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                placeholder="Deliveries, invoices, price lists, catalog for customers..."
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-80"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending to founders…
                </>
              ) : (
                <>
                  Send message
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
            {status === 'success' && (
              <p className="text-sm font-medium text-emerald-700">Received! We will reach out with an integration path.</p>
            )}
            {status === 'error' && (
              <p className="text-sm font-medium text-rose-700">
                Something went wrong. Please retry or email {FOUNDER_EMAIL}.
              </p>
            )}
          </form>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-slate-900 px-6 py-8 text-white shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
              <ShieldCheck className="h-5 w-5 text-emerald-300" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-200">Trust layer</p>
              <h3 className="text-xl font-bold">Reliable, role-aware access</h3>
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-200">
            Granular permissions, signed webhooks, and audit-ready invoice matching keep every party aligned without
            slowing daily work.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-white/5 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                Delivery-to-invoice traceability
              </div>
              <p className="mt-2 text-sm text-slate-200">Each delivery logs price list version and receiving user.</p>
            </div>
            <div className="rounded-xl bg-white/5 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                Customer-grade catalog
              </div>
              <p className="mt-2 text-sm text-slate-200">
                A shared catalog layer so customers see what wholesalers and shops already agreed.
              </p>
            </div>
          </div>
          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between text-sm">
              <span>API integrations live</span>
              <span className="text-emerald-300">POS • ERP • Webhooks</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-brand-500 to-indigo-400"
                style={{ width: `${API_INTEGRATIONS_PROGRESS}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="docs" className="grid gap-6 rounded-2xl border border-slate-100 bg-white/90 p-6 shadow-sm lg:grid-cols-2">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
            <Code2 className="h-4 w-4" />
            For developers
          </div>
          <h3 className="text-2xl font-bold text-slate-900">API integrations that keep every system in sync</h3>
          <p className="text-sm text-slate-600">
            DukaSync APIs let you sync deliveries, invoices, and stock updates directly with your existing POS or ERP.
            Use signed webhooks and sandbox keys to test before you go live.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" onClick={() => navigate('/docs')} className="btn-primary">
              View API docs
              <ArrowRight className="h-4 w-4" />
            </button>
            <button onClick={() => navigate('/login')} className="btn-secondary">
              Launch console
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="grid gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-4 text-sm text-slate-700">
          <div className="flex items-center gap-2 font-semibold text-slate-900">
            <Plug className="h-4 w-4 text-brand-700" />
            Integration highlights
          </div>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Sync deliveries and create invoices automatically.
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Inventory updates stay aligned across wholesalers and shops.
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Webhooks, API keys, and audit-friendly logs for every request.
            </li>
          </ul>
        </div>
      </section>

      <section id="careers" className="grid gap-6 rounded-2xl border border-slate-100 bg-white/90 p-6 shadow-sm lg:grid-cols-2">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
            <Briefcase className="h-4 w-4" />
            Careers
          </div>
          <h3 className="text-2xl font-bold text-slate-900">Build the rails for African retail together</h3>
          <p className="text-sm text-slate-600">
            We&apos;re hiring engineers, operators, and partner success leads who care about reliable commerce
            infrastructure. Join us to ship experiences that keep wholesalers, shops, and customers moving.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" onClick={() => navigate('/careers')} className="btn-primary">
              See open roles
              <ArrowRight className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => navigate('/docs')} className="btn-secondary">
              Explore platform
            </button>
          </div>
        </div>
        <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
          <p className="text-sm font-semibold text-slate-900">What you&apos;ll shape</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-brand-700" />
              APIs that sync orders, price lists, and settlement flows.
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-brand-700" />
              Journeys that make receiving deliveries effortless for shops.
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-brand-700" />
              Dashboards that keep finance, ops, and sales aligned.
            </li>
          </ul>
        </div>
      </section>

    </div>
  )
}

export default LandingPage
