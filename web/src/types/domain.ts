import type { Timestamp } from 'firebase/firestore'

export type UserRole = 'wholesaler' | 'shopkeeper' | 'customer' | 'admin'

export type AccountStatus = 'active' | 'invited' | 'disabled'

export type CompanyType = 'wholesaler' | 'retail_shop'

export interface UserProfile {
  uid: string
  accountType: UserRole
  email?: string
  phoneNumber?: string
  displayName?: string
  companyId?: string
  shopIds?: string[]
  status?: AccountStatus
  lastLoginAt?: Timestamp
  createdAt?: Timestamp
  updatedAt?: Timestamp
}

export interface Company {
  id: string
  name: string
  type: CompanyType
  ownerUserId?: string
  phoneNumber?: string
  address?: string
  city?: string
  country?: string
  createdAt?: Timestamp
  updatedAt?: Timestamp
}

export interface InventoryItem {
  id: string
  companyId: string
  sku?: string
  name: string
  unit?: string
  quantityAvailable: number
  reorderLevel?: number
  price?: number
  currency?: string
  updatedAt?: Timestamp
}

export interface DeliveryLineItem {
  itemId: string
  quantity: number
  unitPrice: number
}

export interface Delivery {
  id: string
  supplierCompanyId: string
  destinationShopId: string
  status: 'draft' | 'in_transit' | 'delivered' | 'cancelled'
  deliveredAt?: Timestamp
  createdAt?: Timestamp
  items: DeliveryLineItem[]
  invoiceId?: string
  reference?: string
  notes?: string
}

export interface InvoiceLineItem {
  itemId: string
  quantity: number
  unitPrice: number
  taxRate?: number
}

export interface Invoice {
  id: string
  supplierCompanyId: string
  shopId?: string
  customerId?: string
  currency: string
  totalAmount: number
  balanceDue: number
  status: 'draft' | 'issued' | 'paid' | 'partial' | 'void'
  issuedAt?: Timestamp
  dueDate?: Timestamp
  items?: InvoiceLineItem[]
  deliveryId?: string
  externalRef?: string
}
