import Navbar from '@/components/layout/Navbar'
import AppRoutes from '@/routes/AppRoutes'

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f9ff] via-white to-[#eef2ff]">
      <Navbar />
      <main className="container py-10">
        <AppRoutes />
      </main>
      <footer className="border-t border-slate-100 bg-white/80 py-6">
        <div className="container flex flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-medium text-slate-700">DukaSync • Neighborhood AI companion</p>
          <p>Crafted to keep shops calm, connected, and customer-first.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
