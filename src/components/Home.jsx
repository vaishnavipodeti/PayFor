

import { usePayFlow } from '../context/PayFlowContext'

function Home({ onNavigate }) {
  const { balance, transactions } = usePayFlow()
  const recentTransactions = transactions.slice(0, 4)

  const money = (amount) =>
    amount.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })

  return (
    <div className="space-y-8">
  <section>
   <p className="text-sm font-medium text-blue-400">YOUR DASHBOARD</p>
 <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl"> Welcome to PayFlow</h1>
<p className="mt-2 text-slate-400">Manage your payments and keep track of your activity.</p>
</section>
<section className="grid gap-5 lg:grid-cols-3">
<div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-7 shadow-lg lg:col-span-2">
<div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10" />
<p className="relative text-sm font-medium text-blue-100">Available balance</p>
<h2 className="relative mt-3 text-4xl font-bold text-white sm:text-5xl">₹{money(balance)}</h2>
<p className="relative mt-3 text-sm text-blue-100">
   Your current PayFlow balance</p>
<button
  onClick={() => onNavigate('send')}
  className="relative mt-7 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-50">
            + Send money
     </button>
   </div>

  <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
  <p className="text-sm text-slate-400"> Total transactions</p>
<h2 className="mt-3 text-4xl font-bold text-white">
   {transactions.length}
  </h2>
 <p className="mt-2 text-sm text-slate-500">
   All recorded payments, including refunds
  </p>
  <button onClick={() => onNavigate('transactions')}
     className="mt-6 text-sm font-semibold text-blue-400 hover:text-blue-300">View transactions →</button>
    </div>
  </section>
<section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-7">
  <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
   <div> <h2 className="text-xl font-bold text-white">
              Recent transactions</h2>

    <p className="mt-1 text-sm text-slate-400"> Your latest payment activity
     </p>
    </div>
<button onClick={() => onNavigate('transactions')}
className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800">
  View all </button>
   </div>
   {recentTransactions.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-700 px-4 py-12 text-center">
            <p className="text-lg font-semibold text-white">
              No transactions yet
            </p>

            <p className="mt-2 text-sm text-slate-400">
              Your payments will appear here when you make one.
            </p>

            <button
              onClick={() => onNavigate('send')}
              className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-500"
            >
              Make your first payment
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-800">
            {recentTransactions.map((transaction) => (
            <div key={transaction.id}
                className="flex flex-wrap items-center justify-between gap-4 py-4" >
             <div>
             <p className="font-semibold text-white">
              {transaction.recipientName}
              </p>
         <p className="mt-1 text-sm text-slate-400">{transaction.date}</p>
                </div>

        <div className="text-right">
          <p className="font-semibold text-white">
           ₹{money(transaction.amount)}
          </p>
          <span
             className={`mt-1 inline-block text-xs font-medium ${
           transaction.status === 'Refunded'
            ? 'text-orange-400': 'text-emerald-400'
              }`}>
          {transaction.status}
         </span>
         </div>
        </div>
        ))}
          </div>
        )}
      </section>
       </div>
      )
       }




export default Home
