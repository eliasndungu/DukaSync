import Navbar from '@/components/layout/Navbar'
import AppRoutes from '@/routes/AppRoutes'
import AppFooter from '@/components/layout/AppFooter'

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f9ff] via-white to-[#eef2ff] flex flex-col">
      <Navbar />
      <main className="container flex-1 py-10">
        <AppRoutes />
      </main>
      <AppFooter />
    </div>
  )
}

export default App
