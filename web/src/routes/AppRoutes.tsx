import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '@/pages/auth/Login'
import LandingPage from '@/pages/public/LandingPage'
import Overview from '@/pages/dashboards/Overview'
import AdminDashboard from '@/pages/dashboards/AdminDashboard'
import WholesalerDashboard from '@/pages/dashboards/WholesalerDashboard'
import ShopDashboard from '@/pages/dashboards/ShopDashboard'
import CustomerDashboard from '@/pages/dashboards/CustomerDashboard'
import Register from '@/pages/auth/SignupPage'
import ForgotPassword from '@/pages/auth/ForgotPasswordPage'
import Unauthorized from '@/pages/public/Unauthorized'
import ProtectedRoute from '@/routes/ProtectedRoute'
import DocsPage from '@/pages/public/DocsPage'
import CareersPage from '@/pages/public/CareersPage'


const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/docs" element={<DocsPage />} />
    <Route path="/careers" element={<CareersPage />} />
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
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard/wholesalers"
      element={
        <ProtectedRoute allowedRoles={['wholesaler', 'shopkeeper']}>
          <WholesalerDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard/shopkeepers"
      element={
        <ProtectedRoute allowedRoles={['shopkeeper']}>
          <ShopDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard/customers"
      element={
        <ProtectedRoute allowedRoles={['customer']}>
          <CustomerDashboard />
        </ProtectedRoute>
      }
    />
    <Route path="/unauthorized" element={<Unauthorized />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
)

export default AppRoutes
