import { type FormEvent, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { ref, serverTimestamp as dbServerTimestamp, set as setRtdb } from 'firebase/database'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { auth, database, firestore } from '@/services/firebase'
import type { UserRole } from '@/types/domain'
import { BadgePlus, Building2, Loader2 } from 'lucide-react'
import DukaSyncTermsModal from '@/components/modals/DukaSyncTermsModal'

type SignupRole = Exclude<UserRole, 'admin'>

const accountOptions: { value: SignupRole; label: string; helper: string }[] = [
  { value: 'wholesaler', label: 'Wholesaler', helper: 'Distribute inventory to shops' },
  { value: 'shopkeeper', label: 'Shopkeeper', helper: 'Run a retail shop with supplier links' },
  { value: 'customer', label: 'Customer', helper: 'Track purchases and orders' },
]

const termsRequiredAccountTypes: SignupRole[] = ['wholesaler']

const defaultChartOfAccounts = {
  wholesaler_cash: { balance: 0, currency: 'KES', label: 'Wholesaler Cash' },
  shop_receivable: { balance: 0, currency: 'KES', label: 'Shop Receivable' },
  customer_receivable: { balance: 0, currency: 'KES', label: 'Customer Receivable' },
  inventory: { balance: 0, currency: 'KES', label: 'Inventory' },
  supplier_payable: { balance: 0, currency: 'KES', label: 'Supplier Payable' },
} as const

const isFirebaseConfigured = Boolean(import.meta.env.VITE_FIREBASE_API_KEY)

const SignupPage = () => {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [accountType, setAccountType] = useState<SignupRole>('shopkeeper')
  const [businessName, setBusinessName] = useState('')
  const [businessRegistrationNumber, setBusinessRegistrationNumber] = useState('')
  const [status, setStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [showTermsModal, setShowTermsModal] = useState(false)

  // Assumption: business-style accounts in this list must accept terms before signup.
  const requiresTermsAcceptance = termsRequiredAccountTypes.includes(accountType)

  const statusMessage = useMemo(() => {
    if (error) return error
    return status
  }, [error, status])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    if (!isFirebaseConfigured) {
      setError('Firebase is not configured. Please set your environment variables and try again.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (accountType === 'wholesaler' && !businessName.trim()) {
      setError('A business name is required for wholesalers.')
      return
    }

    if (requiresTermsAcceptance && !termsAccepted) {
      setError('You must accept the Terms and Conditions to create this type of account.')
      return
    }

    setSubmitting(true)
    setStatus('Creating your DukaPap account…')

    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password)
      const userId = credential.user.uid
      const normalizedRegistrationNumber =
        accountType === 'wholesaler' ? businessRegistrationNumber || null : null

      if (fullName.trim()) {
        await updateProfile(credential.user, { displayName: fullName.trim() })
      }

      const timestamps = { createdAt: serverTimestamp(), updatedAt: serverTimestamp() }
      await setDoc(doc(firestore, 'users', userId), {
        uid: userId,
        accountType,
        displayName: fullName || undefined,
        email,
        businessName: accountType === 'wholesaler' ? businessName : undefined,
        businessRegistrationNumber: normalizedRegistrationNumber,
        ...timestamps,
      })

      if (accountType === 'wholesaler') {
        const wholesalerId = userId

        await setDoc(doc(firestore, 'wholesalers', wholesalerId), {
          id: wholesalerId,
          name: businessName,
          registrationNumber: normalizedRegistrationNumber,
          ownerUserId: wholesalerId,
          type: 'wholesaler',
          ...timestamps,
        })

        const financialAccounts = {
          chartOfAccounts: defaultChartOfAccounts,
          meta: {
            createdAt: dbServerTimestamp(),
            createdBy: wholesalerId,
          },
        }

        try {
          await setRtdb(ref(database, `wholesalers/${wholesalerId}/financials`), financialAccounts)
        } catch (rtdbError) {
          throw new Error(
            rtdbError instanceof Error
              ? `We created your wholesaler profile, but financial accounts were not set up (${rtdbError.message}). Please retry from settings or contact support.`
              : 'We created your wholesaler profile, but financial accounts were not set up. Please retry from settings or contact support.',
          )
        }
      }

      let onboardingNotice: string | null = null
      const onboardingUrl = import.meta.env.VITE_ONBOARDING_API_URL
      if (onboardingUrl) {
        try {
          const idToken = await credential.user.getIdToken()
          const onboardingPayload = {
            uid: userId,
            role: accountType,
            email,
            name: fullName,
            businessName: accountType === 'wholesaler' ? businessName : undefined,
            businessRegistrationNumber: normalizedRegistrationNumber,
          }
          const response = await fetch(onboardingUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify(onboardingPayload),
          })
          if (!response.ok) {
            throw new Error(`Onboarding API returned ${response.status}`)
          }
        } catch (onboardingError) {
          console.warn(
            'Backend onboarding request failed - account created but additional backend setup may be required.',
            onboardingError,
          )
          onboardingNotice =
            'Account created, but backend onboarding failed. You may need to complete setup manually.'
        }
      }

      setStatus(onboardingNotice ?? 'Account created! Redirecting to login…')
      navigate('/login', { replace: true })
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : 'Unable to create your account. Please try again.'
      setError(message)
      setStatus(null)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="space-y-3 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
          <BadgePlus className="h-5 w-5" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Create your DukaPap account</h1>
        <p className="text-slate-600">
          Choose the account that fits how you operate - wholesaler, shopkeeper, or customer. We'll set up the right
          tools instantly.
        </p>
      </div>

      <div className="card p-8">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-sm font-medium text-slate-700">
                Full name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                placeholder="Jane Doe"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email
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

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="space-y-3">
            <span className="block text-sm font-medium text-slate-700">Account type</span>
            <div className="grid gap-3 sm:grid-cols-3">
              {accountOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setAccountType(option.value)}
                  className={`flex w-full flex-col items-start rounded-xl border p-4 text-left transition hover:border-brand-200 hover:bg-brand-50 ${
                    accountType === option.value ? 'border-brand-400 bg-brand-50 shadow-sm' : 'border-slate-200 bg-white'
                  }`}
                >
                  <span className="text-sm font-semibold text-slate-900">{option.label}</span>
                  <span className="text-xs text-slate-500">{option.helper}</span>
                </button>
              ))}
            </div>
          </div>

          {accountType === 'wholesaler' && (
            <div className="space-y-2 rounded-xl border border-brand-100 bg-brand-50 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-brand-800">
                <Building2 className="h-4 w-4" />
                Wholesaler details
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="businessName" className="block text-sm font-medium text-slate-700">
                    Business name
                  </label>
                  <input
                    id="businessName"
                    type="text"
                    required={accountType === 'wholesaler'}
                    value={businessName}
                    onChange={(event) => setBusinessName(event.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                    placeholder="Duka Distributors Ltd."
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="businessRegistrationNumber" className="block text-sm font-medium text-slate-700">
                    Registration number (optional)
                  </label>
                  <input
                    id="businessRegistrationNumber"
                    type="text"
                    value={businessRegistrationNumber}
                    onChange={(event) => setBusinessRegistrationNumber(event.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                    placeholder="BRN-123456"
                  />
                </div>
              </div>
            </div>
          )}

          {statusMessage && (
            <div
              className={`rounded-lg px-3 py-2 text-sm ${
                error ? 'border border-rose-100 bg-rose-50 text-rose-700' : 'border border-emerald-100 bg-emerald-50 text-emerald-700'
              }`}
            >
              {statusMessage}
            </div>
          )}

          {requiresTermsAcceptance && (
            <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <input
                id="termsAccepted"
                type="checkbox"
                checked={termsAccepted}
                onChange={(event) => setTermsAccepted(event.target.checked)}
                aria-describedby="termsAcceptedDescription"
                aria-required={requiresTermsAcceptance}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
              />
              <div className="space-y-1 text-sm text-slate-700">
                <label htmlFor="termsAccepted" className="block font-medium text-slate-900">
                  I have read and accept the Terms and Conditions for DukaSync business accounts.
                </label>
                <p id="termsAcceptedDescription" className="text-slate-600">
                  Wholesalers must agree to the DukaSync terms covering deliveries, invoicing, and data use.
                </p>
                <button
                  type="button"
                  onClick={() => setShowTermsModal(true)}
                  className="font-semibold text-brand-700 hover:underline"
                >
                  View Terms and Conditions
                </button>
              </div>
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
                Creating account…
              </>
            ) : (
              <>
                <BadgePlus className="h-4 w-4" />
                Create account
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-brand-700">
            Sign in
          </Link>
        </div>
      </div>

      <DukaSyncTermsModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        onAccept={() => {
          setTermsAccepted(true)
          setShowTermsModal(false)
        }}
      />
    </div>
  )
}

export default SignupPage
