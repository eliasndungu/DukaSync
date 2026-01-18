# DukaPap Partnership & Delivery Plan

This document aligns Elias Ndungu and Perpetua Nganga on how DukaPap will be built, funded, and run.

## Roles & Responsibilities

| Area | Elias Ndungu (CTO/Technical Lead) | Perpetua Nganga (COO/Business Lead) |
| --- | --- | --- |
| Product & Architecture | Owns system design, technical roadmap, security, and QA. | Shapes customer requirements, pricing, and go-to-market priorities. |
| Engineering | Leads coding, code reviews, deployments, incident response. | Provides feedback from users and organizes UAT/sign-off. |
| Infrastructure | Sets up and pays for Firebase, Google Cloud Run, GitHub Actions/Copilot. | Approves budgets, monitors spend with Elias, and prepares monthly summaries. |
| Operations & Sales | Provides technical input for sales demos and integrations. | Leads customer acquisition, partnerships, contracts, and invoicing. |
| Governance | Maintains engineering standards and release gates. | Oversees legal, finance, and investor/partner communications. |

## Profit & Loss Sharing (proposed)

- Profit split: **Elias 60% / Perpetua 40%** to reflect current engineering and infrastructure investment; revisit after launch or after 12 months based on contribution changes.
- Losses/expenses: Reimburse direct project costs **before** profit split (Firebase, Google Cloud Run, GitHub Copilot/Agent, WiFi at ~3,000 KES/month, and any integration tools).
- Expense tracking: Record receipts monthly; both partners approve any single expense above **5,000 KES**.
- Decision log: Keep a shared decision log (Notion/Doc) for budget approvals and roadmap changes.

## Delivery Phases & Milestones (non-technical summary)

1. **Foundation & Access (Week 1-2)**  
   - Configure Firebase (Auth, Firestore), Cloud Run, GitHub Actions, environments, and role-based access.  
   - Deliverables: Working auth flow, health check endpoint, staging environment.
2. **Wholesaler Workspace (Week 3-4)**  
   - Inventory intake, pricing, invoicing, delivery scheduling.  
   - Deliverables: Wholesaler dashboard, create/update inventory, issue invoices.
3. **Shopkeeper Workspace (Week 5-6)**  
   - Receive deliveries, auto-sync stock from wholesalers, basic sales/returns tracking.  
   - Deliverables: Shopkeeper dashboard, delivery acceptance, stock reconciliation.
4. **Customer E-commerce (Week 7-8)**  
   - Storefront, product search, cart/checkout, order status notifications.  
   - Deliverables: Public storefront, checkout flow, order history.
5. **Integrations & Go-Live (Week 9-10)**  
   - API hooks for existing wholesale/shop software, reporting, monitoring, and on-call runbook.  
   - Deliverables: API documentation, error/usage dashboards, runbook for incidents.

## Systems Overview (plain language)

- **Web App (React + Vite)** – The screens customers and partners see; hosted on Firebase Hosting.  
- **Backend (Django on Cloud Run)** – Secure APIs for orders, inventory, invoices, and business rules.  
- **Firebase Auth & Firestore** – Handles login, user roles, and stores synced operational data.  
- **Cloud Run** – Runs the backend as a container; scales up for traffic and down to save cost.  
- **GitHub Actions + CodeQL** – Automated checks for security and deployment; reduces manual effort.  
- **Integrations API** – Future connectors so wholesalers/shopkeepers can sync from existing software instead of retyping data.

## Operating Costs (current owner: Elias)

| Item | Notes |
| --- | --- |
| Firebase (Auth, Firestore, Hosting) | Usage-based; covers auth, database, hosting for the web app. |
| Google Cloud Run | Pay-as-you-go for the Django API containers. |
| GitHub Copilot/Agent | Subscription/usage for development productivity. |
| WiFi | ~**3,000 KES/month** for dedicated development connectivity (paid by Elias). |

Review costs monthly; adjust budget before adding new paid services.

## Access & Accounts

- **Firebase:** Both are added; Perpetua can view auth/users and analytics; Elias manages configurations.  
- **GitHub:** Perpetua can follow progress and issues; Elias manages protected branches and CI.  
- **Cloud Run / Billing:** Billing currently on Elias’s account; move to shared billing when revenue starts.

## Next Steps

1. Confirm or adjust the profit split and expense approval threshold.  
2. Agree on the phase timeline and acceptance criteria per milestone.  
3. Start a shared cost log and decision log (monthly review).  
4. Schedule weekly check-ins to review progress, risks, and spend.
