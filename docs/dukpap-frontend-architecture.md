# DukaPap frontend architecture (proposed)

## Recommended folder structure

```
web/src
├─ pages/                # Route-level screens (welcome, auth, dashboards)
│  ├─ public/
│  ├─ auth/
│  └─ dashboards/        # admin / wholesaler / shopkeeper / customer entry points
├─ components/           # Reusable UI
│  ├─ layout/            # Shells, headers, navigation
│  ├─ forms/             # Inputs, validators, form helpers
│  ├─ modals/            # Dialogs, drawers
│  ├─ feedback/          # Empty states, toasts, loaders
│  └─ data-display/      # Tables, cards, badges
├─ features/             # Domain-focused slices (mirrors Neuracraft modules)
│  ├─ auth/
│  ├─ wholesaler/        # Stock, price lists, B2B relationships
│  ├─ shopkeeper/        # Deliveries received, retail inventory, statements
│  ├─ customer/          # Multi-shop catalog, orders
│  ├─ admin/             # Platform controls
│  └─ shared/            # Cross-role utilities (analytics widgets, statements)
├─ routes/               # Central route map + ProtectedRoute wrappers
├─ lib/                  # Framework-agnostic helpers (firebase client, api client)
│  ├─ firebase/          # Auth/Firestore/RTDB clients & converters
│  ├─ api/               # REST/GraphQL clients for external POS/ERP sync
│  ├─ permissions/       # Role guards + capability matrix
│  └─ storage/           # File uploads/downloading
├─ hooks/                # Reusable React hooks (useAuthUser, useRole, useOrg)
├─ services/             # Gateway-style utilities already present (keep for now)
├─ types/                # Shared TS types (see `types/domain.ts`)
└─ assets/               # Static assets
```

## Domain models (drop-in types)

TypeScript interfaces live in `web/src/types/domain.ts` and cover:

- `UserRole`, `AccountStatus`, and `UserProfile` (roles: wholesaler | shopkeeper | customer | admin).
- `Company` for wholesalers or large shops.
- `InventoryItem`, `Delivery` (+ line items), and `Invoice` (+ line items) for stock, logistics, and billing.

## Firestore `users/{uid}` document shape (adapted from Neuracraft)

```
users/{uid}:
{
  uid: string,
  accountType: "wholesaler" | "shopkeeper" | "customer" | "admin",
  email?: string,
  phoneNumber?: string,
  displayName?: string,
  companyId?: string,         // wholesaler or shop linkage
  shopIds?: string[],         // shops a user manages/works in
  status?: "active" | "invited" | "disabled",
  permissions?: string[],     // optional fine-grain overrides
  lastLoginAt?: Timestamp,
  createdAt: serverTimestamp(),
  updatedAt: serverTimestamp()
}
```

Related collections (optional, to mirror Neuracraft patterns):
- `companies/{companyId}` for wholesaler or shop metadata.
- `companies/{companyId}/inventory` and `companies/{companyId}/priceLists`.
- `deliveries/{deliveryId}` and `invoices/{invoiceId}` with back-references to company/shop/customer.

## Auth + role-based routing (React Router v6)

1. Firebase Auth handles session; after login, load the Firestore `users/{uid}` doc into an AuthUser/Role context.
2. `ProtectedRoute` first checks auth, then checks `accountType` against allowed roles for the route. Redirect to `/login` if unauthenticated or to a role-appropriate dashboard if unauthorized.
3. Route map example:
   - Public: `/` (welcome), `/login`.
   - Authenticated dashboards: `/dashboard` (role-aware landing), `/dashboard/admin`, `/dashboard/wholesalers`, `/dashboard/shopkeepers`, `/dashboard/customers`.
4. Feature modules expose role-specific layout + nested routes (e.g., wholesaler deliveries, invoices, B2B relationships; shopkeeper receiving + retail inventory; customer catalog/orders).
5. Persist role + permissions in context so components and hooks (`useRole`, `useCan`) can gate UI actions and API calls, following Neuracraft’s pattern but typed with the interfaces above.
