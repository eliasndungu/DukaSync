import { Link } from 'react-router-dom'
import { ShieldCheck, Sparkles, Store, ArrowRight } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

const features = [
  {
    title: 'Realtime inventory',
    description: 'Keep products, stock, and sales in sync with your team.',
    icon: <Store className="h-5 w-5 text-brand-600" />,
  },
  {
    title: 'Secure by default',
    description: 'Protected routes powered by Firebase Authentication.',
    icon: <ShieldCheck className="h-5 w-5 text-brand-600" />,
  },
  {
    title: 'Built to grow',
    description: 'Clean React + Vite foundation ready for new features.',
    icon: <Sparkles className="h-5 w-5 text-brand-600" />,
  },
]

const Home = () => {
  const { user } = useAuth()

  return (
    <div className="space-y-12">
      <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700">
            <Sparkles className="h-4 w-4" />
            Modern retail toolkit
          </span>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
              DukaSync helps shop owners run faster, smarter, and together.
            </h1>
            <p className="text-lg text-slate-600">
              A minimal React + TypeScript starter with Tailwind CSS, React Router, and Firebase
              Auth. Ship new features quickly and deploy to Firebase Hosting with confidence.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link to={user ? '/dashboard' : '/login'} className="btn-primary">
              {user ? 'Go to dashboard' : 'Login to continue'}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/dashboard" className="btn-secondary">
              Explore dashboard
            </Link>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              Deployed-ready SPA
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-brand-500" />
              Firebase powered
            </div>
          </div>
        </div>
        <div className="card p-6 sm:p-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <Store className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Firebase Hosting</p>
                  <p className="text-lg font-semibold text-slate-900">duka-pap.web.app</p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                Ready
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.title} className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                  <div className="mb-3 inline-flex rounded-lg bg-brand-50 p-2">{feature.icon}</div>
                  <p className="text-sm font-semibold text-slate-900">{feature.title}</p>
                  <p className="mt-1 text-sm text-slate-500">{feature.description}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-dashed border-brand-200 bg-brand-50/40 p-4 text-sm text-brand-800">
              Runs on React, Vite, Tailwind CSS, React Router, and Firebase (Auth + Firestore).
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
