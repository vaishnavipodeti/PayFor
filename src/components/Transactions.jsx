

import { usePayFlow } from '../context/PayFlowContext'

function Transactions() {
  const { transactions, refundTransaction } = usePayFlow()

  function handleRefund(transactionId) {
    const confirmed = window.confirm(
      'Are you sure you want to refund this payment?'
    )

    if (!confirmed) return

    const success = refundTransaction(transactionId)

    if (!success) {
      window.alert('This transaction cannot be refunded.')
    }
  }

  const money = (amount) =>
    amount.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })

  return (
<div className="space-y-6">
  <div>
  <p className="text-sm font-medium text-blue-400">ACTIVITY</p>
    <h1 className="mt-2 text-3xl font-bold text-white">Transactions</h1>
  <p className="mt-2 text-slate-400">
    Review your payment history and manage refunds.
     </p>
  </div>
   <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-7">
     <div className="mb-5 flex items-center justify-between gap-3">
      <h2 className="text-lg font-bold text-white">All transactions</h2>
     <span className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300">
       {transactions.length} total
    </span>
     </div>
    {transactions.length === 0 ? (
     <div className="rounded-xl border border-dashed border-slate-700 px-4 py-12 text-center">
     <h3 className="font-semibold text-white">Nothing here yet</h3>
      <p className="mt-2 text-sm text-slate-400"> Your payment history will appear here after your first payment.
            </p>
          </div>
        ) : (
      <div className="space-y-3"> {transactions.map((transaction) => (
     <article key={transaction.id}
      className="flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4 sm:flex-row sm:items-center sm:justify-between">
    <div className="min-w-0">
    <h3 className="font-semibold text-white">
     {transaction.recipientName} </h3>
    <p className="mt-1 break-all text-sm text-slate-400"> {transaction.upiID}</p>
    {transaction.note && (
                    <p className="mt-1 text-sm text-slate-500">
                      Note: {transaction.note}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-slate-500">
                    {transaction.date}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 sm:justify-end">
                  <div className="sm:text-right">
                    <p className="text-lg font-bold text-white">
                      ₹{money(transaction.amount)}
                    </p>
                    <span className={`mt-1 inline-block rounded-full px-2.5 py-1 text-xs font-medium ${
                      transaction.status === 'Successful'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-orange-500/10 text-orange-400'
                    }`}>
                      {transaction.status}
                    </span>
                  </div>

                  {transaction.status === 'Successful' && (
                    <button
                      onClick={() => handleRefund(transaction.id)}
                      className="rounded-lg border border-red-500/40 px-3 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
                    >
                      Refund
                    </button>
                  )}
                  </div>
                 </article>
                 ))}
               </div>
              )}
             </div>
            </div>
            )
            }

             export default Transactions
