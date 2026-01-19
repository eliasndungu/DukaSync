import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { app, auth } from '@/services/firebase'
import { Loader2, ShieldAlert } from 'lucide-react'

type AllowedRole = 'admin' | 'wholesaler' | 'shopkeeper' | 'customer'

type FirestoreUser = {
  role?: string
  accountType?: string
  [key: string]: unknown
}

const brandName = 'DukaPap'
const validRoles: AllowedRole[] = ['admin', 'wholesaler', 'shopkeeper', 'customer']

type ProtectedRouteProps = {
  allowedRoles?: AllowedRole[]
  children: ReactNode
}

type ProtectedRouteState = {
  loading: boolean
  user: User | null
  role: AllowedRole | null
  error: 'config' | 'user-data' | null
  userData: FirestoreUser | null
}

const firebaseConfigured = Boolean(
  import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_PROJECT_ID,
)

const initialState: ProtectedRouteState = {
  loading: true,
  user: null,
  role: null,
  error: null,
  userData: null,
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const [state, setState] = useState<ProtectedRouteState>(initialState)

  useEffect(() => {
    let isMounted = true

    if (!firebaseConfigured || !app?.options?.projectId) {
      setState((prev) => ({ ...prev, loading: false, error: 'config' }))
      return
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!isMounted) return

      if (!currentUser) {
        setState({ ...initialState, loading: false })
        return
      }

      setState((prev) => ({
        ...prev,
        loading: true,
        user: currentUser,
        error: null,
      }))

      try {
        const db = getFirestore(app)
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid))
        const data = userDoc.data() as FirestoreUser | undefined
        const rawRole = data?.role ?? data?.accountType
        const normalizedRole = rawRole
          ? validRoles.find((role) => role === rawRole.toString().toLowerCase()) ?? null
          : null

        if (isMounted) {
          setState({
            loading: false,
            user: currentUser,
            role: normalizedRole,
            error: null,
            userData: data ?? null,
          })
        }
      } catch (error) {
        console.error('Failed to fetch user role', error)
        if (isMounted) {
          setState({
            loading: false,
            user: currentUser,
            role: null,
            error: 'user-data',
            userData: null,
          })
        }
      }
    })

    return () => {
      isMounted = false
      unsubscribe()
    }
  }, [])

  const isAllowed = useMemo(() => {
    if (!allowedRoles || allowedRoles.length === 0) return true
    return state.role ? allowedRoles.includes(state.role) : false
  }, [allowedRoles, state.role])

  if (state.error === 'config') {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-white to-indigo-50 px-6 py-12 text-center shadow-sm">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700 shadow-inner">
          <ShieldAlert className="h-7 w-7" />
        </div>
        <h2 className="text-2xl font-semibold text-slate-800">Configuration Error</h2>
        <p className="mt-3 max-w-xl text-base text-slate-600">
          {brandName} couldn’t connect to Firebase. Please verify your environment variables and try
          again.
        </p>
        <div className="mt-6 inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-indigo-700 shadow-sm ring-1 ring-indigo-100">
          Check <span className="mx-1 rounded bg-indigo-50 px-2 py-0.5 font-mono">.env</span> setup
        </div>
      </div>
    )
  }

  if (state.loading) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-white to-slate-50 px-6 py-10 text-center shadow-sm">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-700 shadow-inner">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
        <p className="text-sm font-semibold text-indigo-700">Checking authentication…</p>
        <p className="mt-2 max-w-md text-sm text-slate-600">
          Hold tight while we confirm your {brandName} access and workspace permissions.
        </p>
      </div>
    )
  }

  if (!state.user) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && allowedRoles.length > 0 && !isAllowed) {
    return <Navigate to="/unauthorized" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
