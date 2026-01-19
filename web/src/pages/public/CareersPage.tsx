import { ArrowLeft, Briefcase } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const CareersPage = () => {
  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-3xl space-y-8 py-12">
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => navigate('/')} className="btn-secondary">
          <ArrowLeft className="h-4 w-4" />
          Back to landing
        </button>
        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-brand-700">
          <Briefcase className="h-4 w-4" />
          Careers
        </div>
      </div>

      <div className="card space-y-4 p-6">
        <h1 className="text-3xl font-bold text-slate-900">Join the DukaSync team</h1>
        <p className="text-slate-600">
          We&apos;re building the rails for wholesalers, shops, and customers to stay in sync. Share your profile and the
          problems you want to solve, and we&apos;ll reach out when roles open.
        </p>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={() => window.location.assign('/#careers')} className="btn-primary">
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

export default CareersPage
