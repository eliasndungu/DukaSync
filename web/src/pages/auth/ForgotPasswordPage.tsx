import { type FormEvent, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '@/services/firebase'
import { ArrowLeft, Loader2, Mail } from 'lucide-react'

const isFirebaseConfigured = Boolean(import.meta.env.VITE_FIREBASE_API_KEY)

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const statusMessage = useMemo(() => {
    if (error) return error
    return status
  }, [error, status])

  const handleReset = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    if (!isFirebaseConfigured) {
      setError('Firebase is not configured. Please set your environment variables and try again.')
      return
    }

    setSubmitting(true)
    setStatus('Sending reset link…')
    try {
      await sendPasswordResetEmail(auth, email)
      setStatus('If that email is registered, a reset link is on its way. Check your inbox and spam folder.')
    } catch (resetError) {
      const message =
        resetError instanceof Error
          ? resetError.message
          : 'Unable to send reset link. Please try again or contact support.'
      setError(message)
      setStatus(null)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-xl space-y-8">
      <div className="space-y-3 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
          <Mail className="h-5 w-5" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Reset your password</h1>
        <p className="text-slate-600">
          Enter your email and we'll send you a secure link to create a new password for your DukaPap account.
        </p>
      </div>

      <div className="card p-8">
        <form className="space-y-6" onSubmit={handleReset}>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
              placeholder="you@dukapap.com"
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
                Sending reset link…
              </>
            ) : (
              <>
                <Mail className="h-4 w-4" />
                Send reset link
              </>
            )}
          </button>
        </form>

        <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
          <ArrowLeft className="h-4 w-4" />
          <Link to="/login" className="font-semibold text-brand-700">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
