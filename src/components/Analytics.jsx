
import { usePayFlow } from '../context/PayFlowContext'

function Analytics() {
  const { transactions, balance } = usePayFlow()

  const successfulTransactions = transactions.filter(
    (transaction) => transaction.status === 'Successful'
  )

  const refundedTransactions = transactions.filter(
    (transaction) => transaction.status === 'Refunded'
  )

  const totalAmountSent = successfulTransactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  )

  const money = (amount) =>
    amount.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })

  const stats = [
    {
      label: 'Available balance',
      value: `₹${money(balance)}`,
      description: 'Your current demo balance',
      accent: 'text-blue-400',
    },
    {
      label: 'Total transactions',
      value: transactions.length,
      description: 'All recorded payment activity',
      accent: 'text-white',
    },
    {
      label: 'Amount sent',
      value: `₹${money(totalAmountSent)}`,
      description: 'Excludes refunded payments',
      accent: 'text-emerald-400',
    },
    {
      label: 'Refunded payments',
      value: refundedTransactions.length,
      description: 'Payments marked as refunded',
      accent: 'text-orange-400',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-blue-400">INSIGHTS</p>
        <h1 className="mt-2 text-3xl font-bold text-white">
          Analytics
        </h1>
        <p className="mt-2 text-slate-400">
          Understand your payment activity at a glance.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
          >
            <p className="text-sm text-slate-400">{stat.label}</p>
            <p className={`mt-4 break-words text-2xl font-bold ${stat.accent}`}>
              {stat.value}
            </p>
            <p className="mt-3 text-sm text-slate-500">
              {stat.description}
            </p>
          </div>
        ))}
      </div>

      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-lg font-bold text-white">Payment summary</h2>
        <p className="mt-2 text-sm text-slate-400">
          Successful payments: {successfulTransactions.length}
        </p>
        <p className="mt-2 text-sm text-slate-400">
          Refunded payments: {refundedTransactions.length}
        </p>
        <p className="mt-2 text-sm text-slate-400">
          Total recorded payments: {transactions.length}
        </p>
      </section>
    </div>
  )
}

export default Analytics
