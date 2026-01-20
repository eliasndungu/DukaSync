import { type FormEvent, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { auth, firestore } from '@/services/firebase'
import { getDashboardPathForRole } from '@/utils/dashboardRoutes'
import { Lock, LogIn } from 'lucide-react'

const Login = () => {
  const { login, loading } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const credential = await login(email, password)
      const currentUser = credential?.user ?? auth.currentUser

      let destination = '/dashboard'
      if (currentUser) {
        try {
          const profileSnapshot = await getDoc(doc(firestore, 'users', currentUser.uid))
          const profileData = profileSnapshot.data() as { accountType?: string; role?: string } | undefined
          destination = getDashboardPathForRole(profileData?.accountType ?? profileData?.role)
        } catch (profileError) {
          console.warn('Unable to fetch user profile for redirect', profileError)
        }
      }

      navigate(destination, { replace: true })
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unable to sign in. Please check your credentials and try again.'
      setError(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-xl space-y-8">
      <div className="space-y-3 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
          <Lock className="h-5 w-5" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Login</h1>
        <p className="text-slate-600">
          Access your dashboard with your email and password. Your account stays private with our layered safeguards.
        </p>
      </div>

      <div className="card p-8">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
              placeholder="you@dukashop.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="rounded-lg border border-rose-100 bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting || loading}
            className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
          >
            <LogIn className="h-4 w-4" />
            {submitting || loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          Need an account? <Link to="/register" className="text-slate-900 underline">Sign up</Link>.
        </div>
      </div>
    </div>
  )
}

export default Login
