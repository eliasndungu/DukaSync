import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '@/pages/public/Home'
import Login from '@/pages/auth/Login'
import Overview from '@/pages/dashboards/Overview'
import AdminDashboard from '@/pages/dashboards/AdminDashboard'
import WholesalerDashboard from '@/pages/dashboards/WholesalerDashboard'
import ShopkeeperDashboard from '@/pages/dashboards/ShopkeeperDashboard'
import CustomerDashboard from '@/pages/dashboards/CustomerDashboard'
import { useAuth } from '@/context/AuthContext'
import { Loader2 } from 'lucide-react'
import type { ReactNode } from 'react'

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-slate-600">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span className="ml-2 text-sm font-medium">Checking access…</span>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Overview />
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard/admin"
      element={
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard/wholesalers"
      element={
        <ProtectedRoute>
          <WholesalerDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard/shopkeepers"
      element={
        <ProtectedRoute>
          <ShopkeeperDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard/customers"
      element={
        <ProtectedRoute>
          <CustomerDashboard />
        </ProtectedRoute>
      }
    />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
)

export default AppRoutes
