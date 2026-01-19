import { type FormEvent, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, firestore } from '@/services/firebase'
import type { UserRole } from '@/types/domain'
import { Loader2, Lock, LogIn } from 'lucide-react'

const roleRedirects: Record<UserRole | 'fallback', string> = {
  wholesaler: '/wholesaler-dashboard',
  shopkeeper: '/shop-dashboard',
  customer: '/customer-dashboard',
  admin: '/admin-dashboard',
  fallback: '/dashboard',
}

const isFirebaseConfigured = Boolean(import.meta.env.VITE_FIREBASE_API_KEY)

const isUserRole = (value: unknown): value is UserRole =>
  value === 'wholesaler' || value === 'shopkeeper' || value === 'customer' || value === 'admin'

const LoginPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const statusMessage = useMemo(() => {
    if (error) return error
    return status
  }, [error, status])

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    if (!isFirebaseConfigured) {
      setError('Firebase is not configured. Please set your environment variables and try again.')
      return
    }

    setSubmitting(true)
    setStatus('Signing you in to DukaPap…')

    try {
      const credential = await signInWithEmailAndPassword(auth, email, password)
      const userId = credential.user.uid

      const profileSnapshot = await getDoc(doc(firestore, 'users', userId))
      if (!profileSnapshot.exists()) {
        setStatus('Profile not found. Redirecting to a safe dashboard view…')
        navigate(roleRedirects.fallback, { replace: true })
        return
      }

      const profileData = profileSnapshot.data()
      // Prefer accountType but fall back to role for legacy compatibility
      const rawRole = profileData.accountType ?? profileData.role
      const role: UserRole | undefined = isUserRole(rawRole) ? rawRole : undefined

      const destination = role ? roleRedirects[role] : roleRedirects.fallback
      setStatus('Success! Redirecting to your dashboard…')
      navigate(destination, { replace: true })
    } catch (loginError) {
      const message =
        loginError instanceof Error
          ? loginError.message
          : 'Unable to sign in. Please verify your credentials and try again.'
      setError(message)
      setStatus(null)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="space-y-3 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
          <Lock className="h-5 w-5" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Welcome back to DukaPap</h1>
        <p className="text-slate-600">
          Sign in to access your DukaPap tools. We&apos;ll tailor the experience based on your role.
        </p>
      </div>

      <div className="card p-8">
        <form className="space-y-6" onSubmit={handleLogin}>
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
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
              placeholder="you@dukapap.com"
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
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
              placeholder="••••••••"
            />
          </div>

          {statusMessage && (
            <div
              className={`rounded-lg px-3 py-2 text-sm ${
                error ? 'border border-rose-100 bg-rose-50 text-rose-700' : 'border border-emerald-100 bg-emerald-50 text-emerald-700'
              }`}
            >
              {statusMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Signing in…
              </>
            ) : (
              <>
                <LogIn className="h-4 w-4" />
                Sign in
              </>
            )}
          </button>
        </form>

        <div className="mt-6 flex flex-wrap items-center justify-between text-sm text-slate-500">
          <Link to="/forgot-password" className="font-semibold text-brand-700">
            Forgot password?
          </Link>
          <span>
            New to DukaPap?{' '}
            <Link to="/signup" className="font-semibold text-brand-700">
              Create an account
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
