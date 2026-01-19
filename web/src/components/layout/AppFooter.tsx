import { Link } from 'react-router-dom'
import { Github, Linkedin, Rss } from 'lucide-react'
import type { FC } from 'react'

const AppFooter: FC = () => {
  return (
    <footer className="mt-16 border-t border-slate-800 bg-slate-900 text-slate-200">
      <div className="container grid gap-10 px-4 py-12 md:grid-cols-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-lg font-bold text-brand-700">
              DS
            </div>
            <div>
              <p className="text-lg font-semibold text-white">DukaSync</p>
              <p className="text-sm font-medium text-brand-200">DukaPap by DukaSync</p>
            </div>
          </div>
          <p className="text-sm text-slate-300">
            Connecting wholesalers, shopkeepers, and customers with a single source of truth. DukaSync keeps inventory,
            deliveries, and invoices in sync across channels with API-ready integrations.
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-200">Explore</p>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>
              <Link to="/" className="hover:text-brand-200">
                Home
              </Link>
            </li>
            <li>
              <a href="/#features" className="hover:text-brand-200">
                Features
              </a>
            </li>
            <li>
              <a href="/#pricing" className="hover:text-brand-200">
                Pricing
              </a>
            </li>
            <li>
              <a href="/#docs" className="hover:text-brand-200">
                API Docs
              </a>
            </li>
            <li>
              <a href="/#careers" className="hover:text-brand-200">
                Careers
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-200">Developers</p>
          <p className="text-sm text-slate-300">
            Build with DukaSync APIs to sync deliveries, invoices, and stock with your existing POS or ERP. Webhooks,
            sandbox keys, and docs are ready for your team.
          </p>
          <a href="/#docs" className="inline-flex items-center text-sm font-semibold text-brand-200 hover:text-brand-100">
            Read the docs
          </a>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-200">Contact</p>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>Nairobi, Kenya</li>
            <li>info@dukasync.com</li>
            <li>
              <a href="https://www.linkedin.com/in/elias-ndungu" target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-2 hover:text-brand-200">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://github.com/eliasndungu" target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-2 hover:text-brand-200">
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </li>
            <li>
              <a href="https://blog.eliasndungu.com" target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-2 hover:text-brand-200">
                <Rss className="h-4 w-4" />
                Blog
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default AppFooter
