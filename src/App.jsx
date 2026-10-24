

import { useState } from 'react'
import { PayFlowProvider } from './context/PayFlowContext'
import Navbar from './components/Navbar'
import Home from './components/Home'
import SendMoney from './components/SendMoney'
import Transactions from './components/Transactions'
import Analytics from './components/Analytics'

function PayFlowApp() {
  const [page, setPage] = useState('home')

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar page={page} onNavigate={setPage} />
     <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {page === 'home' && <Home onNavigate={setPage} />}
        {page === 'send' && <SendMoney onNavigate={setPage} />}
        {page === 'transactions' && <Transactions />}
        {page === 'analytics' && <Analytics />}
      </main>
    <footer className="border-t border-slate-800 px-4 py-5 text-center text-sm text-slate-500">
        PayFlow · Personal finance dashboard
      </footer>
    </div>
      )
     }

export default function App() {
  return (
    <PayFlowProvider>
      <PayFlowApp />
    </PayFlowProvider>
  )
}
