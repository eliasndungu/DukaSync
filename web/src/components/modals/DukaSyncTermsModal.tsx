import { useEffect, useRef } from 'react'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex^="-"]), [role="button"]:not([tabindex^="-"]), [role="link"]:not([tabindex^="-"])'

type DukaSyncTermsModalProps = {
  isOpen: boolean
  onClose: () => void
  onAccept: () => void
}

const DukaSyncTermsModal = ({ isOpen, onClose, onAccept }: DukaSyncTermsModalProps) => {
  const dialogRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement | null
      dialogRef.current?.focus()
    } else if (previousFocusRef.current) {
      requestAnimationFrame(() => previousFocusRef.current?.focus())
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 py-6">
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dukasync-terms-title"
        aria-describedby="dukasync-terms-body"
        className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            event.stopPropagation()
            onClose()
            return
          }

          if (event.key === 'Tab') {
            const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
            const focusableElements = focusable ? Array.from(focusable) : []
            if (focusableElements.length === 0) return

            const firstElement = focusableElements[0]
            const lastElement = focusableElements[focusableElements.length - 1]
            const activeElement = document.activeElement as HTMLElement | null

            if (event.shiftKey) {
              if (activeElement === firstElement || activeElement === dialogRef.current) {
                event.preventDefault()
                lastElement.focus()
              }
            } else if (activeElement === lastElement) {
              event.preventDefault()
              firstElement.focus()
            }
          }
        }}
      >
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-6 py-4">
          <div className="space-y-1">
            <h2 id="dukasync-terms-title" className="text-lg font-semibold text-slate-900">
              DukaSync Terms & Conditions
            </h2>
            <p className="text-sm text-slate-500">
              Please review these terms to continue creating your DukaSync (DukaPap) business account.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            Close
          </button>
        </div>

        <div
          id="dukasync-terms-body"
          className="max-h-[70vh] space-y-4 overflow-y-auto px-6 py-5 text-sm text-slate-700"
        >
          <section className="space-y-1">
            <h3 className="text-base font-semibold text-slate-900">1. Service Description</h3>
            <p>
              DukaSync connects wholesalers, shopkeepers, and customers to streamline ordering, delivery, invoicing, and
              stock synchronization. The platform includes route and delivery management, invoice generation, inventory
              tracking, and APIs to integrate with external POS or ERP systems.
            </p>
            <p>
              You agree to use DukaSync only for lawful retail and wholesale operations and to keep your account details
              accurate and current.
            </p>
          </section>

          <section className="space-y-1">
            <h3 className="text-base font-semibold text-slate-900">2. Account Types & Eligibility</h3>
            <p>
              Business accounts (e.g., wholesalers or shop operators) are intended for organizations managing inventory,
              deliveries, or customer orders. You must be authorized to act on behalf of the business you register and
              provide accurate business information.
            </p>
          </section>

          <section className="space-y-1">
            <h3 className="text-base font-semibold text-slate-900">3. Data Usage and Privacy</h3>
            <p>
              DukaSync processes transaction data such as orders, deliveries, invoices, and stock movements, along with
              business and shop information, to provide the service. We may use aggregated or anonymized data to improve
              routing, analytics, and recommendation models. Where applicable, data is handled with privacy-preserving
              practices and never sold to third parties.
            </p>
          </section>

          <section className="space-y-1">
            <h3 className="text-base font-semibold text-slate-900">4. User Responsibilities</h3>
            <p>
              You are responsible for keeping login credentials secure, ensuring submitted data is accurate, and
              respecting the privacy of shops and customers. Fraudulent activity, misuse of delivery information, or
              attempts to disrupt service are prohibited and may lead to suspension.
            </p>
          </section>

          <section className="space-y-1">
            <h3 className="text-base font-semibold text-slate-900">5. Company Account Status</h3>
            <p>
              Wholesaler or shop accounts may undergo verification. Providing false business details, operating outside
              permitted regions, or violating these terms can result in limited functionality or account closure.
            </p>
          </section>

          <section className="space-y-1">
            <h3 className="text-base font-semibold text-slate-900">6. Service Availability</h3>
            <p>
              We strive for high availability but do not guarantee uninterrupted service. Planned maintenance or outages
              may occur; we will communicate material disruptions when possible.
            </p>
          </section>

          <section className="space-y-1">
            <h3 className="text-base font-semibold text-slate-900">7. API and Integrations</h3>
            <p>
              If you use DukaSync APIs to connect POS or ERP systems, you must secure API keys, comply with usage limits,
              and avoid abusive traffic. Integration failures may affect order syncing or stock accuracy; monitor your
              systems accordingly.
            </p>
          </section>

          <section className="space-y-1">
            <h3 className="text-base font-semibold text-slate-900">8. Payments and Invoices</h3>
            <p>
              Invoices generated in DukaSync should reflect actual goods and services. You are responsible for the
              accuracy of billing details and complying with applicable tax and invoicing regulations in your region.
            </p>
          </section>

          <section className="space-y-1">
            <h3 className="text-base font-semibold text-slate-900">9. Limitation of Liability</h3>
            <p>
              DukaSync is provided on an “as is” basis. To the fullest extent permitted by law, we are not liable for
              indirect, incidental, or consequential damages arising from use of the platform, including lost profits or
              loss of data.
            </p>
          </section>

          <section className="space-y-1">
            <h3 className="text-base font-semibold text-slate-900">10. Updates to Terms</h3>
            <p>
              We may update these terms as the product evolves. Continued use of DukaSync after changes are posted means
              you accept the revised terms. If you do not agree, you should stop using the service.
            </p>
          </section>

          <section className="space-y-1">
            <h3 className="text-base font-semibold text-slate-900">11. Contact</h3>
            <p>
              For questions or support, reach us at support@dukasync.com.
            </p>
          </section>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onAccept}
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
          >
            Accept and Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default DukaSyncTermsModal
