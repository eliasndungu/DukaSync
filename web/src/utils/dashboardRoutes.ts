import type { UserRole } from '@/types/domain'

const roleToDashboardPath: Record<UserRole, string> = {
  admin: '/dashboard/admin',
  wholesaler: '/dashboard/wholesalers',
  shopkeeper: '/dashboard/shopkeepers',
  customer: '/dashboard/customers',
}

const validRoles = Object.keys(roleToDashboardPath) as UserRole[]

export const normalizeUserRole = (role?: string | null): UserRole | null => {
  if (!role) return null
  const normalized = role.toString().toLowerCase()

  if (validRoles.includes(normalized as UserRole)) {
    return normalized as UserRole
  }

  return null
}

export const getDashboardPathForRole = (role?: string | null): string => {
  const normalizedRole = normalizeUserRole(role)
  if (!normalizedRole) return '/dashboard'

  return roleToDashboardPath[normalizedRole]
}
