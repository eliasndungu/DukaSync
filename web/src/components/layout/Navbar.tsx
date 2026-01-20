import { Link, NavLink } from 'react-router-dom'
import { Menu, Store } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { firestore } from '@/services/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition-colors ${
    isActive ? 'text-brand-700' : 'text-slate-600 hover:text-slate-900'
  }`

type UserProfileDoc = {
  displayName?: string
  name?: string
}

const isUserProfileDoc = (data: unknown): data is UserProfileDoc => {
  if (!data || typeof data !== 'object') return false
  const record = data as Record<string, unknown>
  return (
    (record.displayName === undefined || typeof record.displayName === 'string') &&
    (record.name === undefined || typeof record.name === 'string')
  )
}

const Navbar = () => {
  const { user, logout } = useAuth()
  const [displayName, setDisplayName] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let isMounted = true
    const safeSetDisplayName = (value: string | null) => {
      if (isMounted) setDisplayName(value)
    }

    const fetchDisplayName = async () => {
      if (!user) {
        safeSetDisplayName(null)
        return
      }

      if (user.displayName) {
        safeSetDisplayName(user.displayName)
        return
      }

      try {
        const userDoc = await getDoc(doc(firestore, 'users', user.uid))
        if (!userDoc.exists()) {
          safeSetDisplayName(user.email ?? null)
          return
        }
        const data = userDoc.data()
        if (isUserProfileDoc(data)) {
          safeSetDisplayName(data.displayName ?? data.name ?? user.email ?? null)
        } else {
          safeSetDisplayName(user.email ?? null)
        }
      } catch (error) {
        console.error('Failed to fetch user profile', error)
        safeSetDisplayName(user.email ?? null)
      }
    }

    fetchDisplayName()

    return () => {
      isMounted = false
    }
  }, [user])

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-100">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold text-slate-900">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
            <Store className="h-5 w-5" />
          </span>
          DukaSync
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/dashboard" className={navLinkClass}>
            Workspaces
          </NavLink>
          <NavLink to="/login" className={navLinkClass}>
            Login
          </NavLink>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                {displayName ?? user.email}
              </span>
              <button onClick={logout} className="btn-secondary">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn-primary">
              Sign in
            </Link>
          )}
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          <Menu className="h-5 w-5 text-slate-700" />
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-white px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-3">
            <NavLink to="/" className={navLinkClass} onClick={() => setOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/dashboard" className={navLinkClass} onClick={() => setOpen(false)}>
              Workspaces
            </NavLink>
            <NavLink to="/login" className={navLinkClass} onClick={() => setOpen(false)}>
              Login
            </NavLink>
            {user ? (
              <button onClick={logout} className="btn-secondary w-full">
                Logout
              </button>
            ) : (
              <Link to="/login" className="btn-primary w-full" onClick={() => setOpen(false)}>
                Sign in
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
