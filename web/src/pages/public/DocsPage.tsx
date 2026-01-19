import { ArrowLeft, BookOpenText } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const DocsPage = () => {
  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-3xl space-y-8 py-12">
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => navigate('/')} className="btn-secondary">
          <ArrowLeft className="h-4 w-4" />
          Back to landing
        </button>
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">
          <BookOpenText className="h-4 w-4" />
          API Docs
        </div>
      </div>

      <div className="card space-y-4 p-6">
        <h1 className="text-3xl font-bold text-slate-900">DukaSync API documentation</h1>
        <p className="text-slate-600">
          We&apos;re preparing public docs so you can integrate deliveries, invoices, and inventory with your existing
          POS or ERP. In the meantime, contact us for sandbox keys and integration guides.
        </p>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={() => navigate('/#docs')} className="btn-primary">
            Return to overview
          </button>
          <button type="button" onClick={() => navigate('/login')} className="btn-secondary">
            Launch console
          </button>
        </div>
      </div>
    </div>
  )
}

export default DocsPage
