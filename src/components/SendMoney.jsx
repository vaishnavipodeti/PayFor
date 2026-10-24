
import { useState } from 'react'
import { usePayFlow } from '../context/PayFlowContext'

function SendMoney({ onNavigate }) {
  const { balance, sendMoney } = usePayFlow()

  const [recipientName, setRecipientName] = useState('')
  const [upiID, setUpiID] = useState('')
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const [showReview, setShowReview] = useState(false)
  const [error, setError] = useState('')
  const [isConfirmed, setIsConfirmed] = useState(false)

  const money = (value) =>
    value.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })

  function handleReview(event) {
    event.preventDefault()
    setError('')

    const numericAmount = Number(amount)

    if (!recipientName.trim() || !upiID.trim() || amount === '') {
      setError('Please fill in the recipient name, UPI ID and amount.')
      return
    }

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setError('Enter a valid amount greater than zero.')
      return
    }

    if (numericAmount > balance) {
      setError('Insufficient balance. Please enter a smaller amount.')
      return
    }

    setShowReview(true)
  }

  function handleConfirmPayment() {
    const success = sendMoney(recipientName, upiID, amount, note)

    if (!success) {
      setError('Payment could not be completed. Please check your details and balance.')
      setShowReview(false)
      return
    }

    setError('')
    setIsConfirmed(true)
    setShowReview(false)
  }

  function handleNewPayment() {
    setRecipientName('')
    setUpiID('')
    setAmount('')
    setNote('')
    setShowReview(false)
    setIsConfirmed(false)
    setError('')
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
   <div>
    <p className="text-sm font-medium text-blue-400">PAYMENTS</p>
     <h1 className="mt-2 text-3xl font-bold text-white">Send money
   </h1>
    <p className="mt-2 text-slate-400">
     Enter the recipient details and review before confirming.
    </p>
      </div>
  <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-8">
   <div className="mb-7 rounded-xl bg-slate-800/80 p-5">
    <p className="text-sm text-slate-400">Available balance</p>
    <p className="mt-2 text-3xl font-bold text-white">  ₹{money(balance)} </p>
    </div>

  {error && (
     <div role="alert" className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
         {error}
      </div>
    )}

    {!isConfirmed && !showReview && (
     <form onSubmit={handleReview} className="space-y-5">
     <div>
      <label htmlFor="recipientName" className="mb-2 block text-sm font-medium text-slate-200">
        Recipient name
     </label>
      <input id="recipientName" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} placeholder="e.g. Vaishnavi Podeti"
         className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"/>
       </div>
       <div>
        <label htmlFor="upiID" className="mb-2 block text-sm font-medium text-slate-200">
           UPI ID
          </label>
           <input
          id="upiID" value={upiID}
                onChange={(e) => setUpiID(e.target.value)}
                placeholder="example@upi"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label htmlFor="amount" className="mb-2 block text-sm font-medium text-slate-200">
                Amount (₹)
              </label>
              <input
                id="amount"
                type="number"
                min="0.01"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label htmlFor="note" className="mb-2 block text-sm font-medium text-slate-200">
                Note <span className="text-slate-500">(optional)</span>
              </label>
              <input
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="What's this payment for?"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
            >
              Review payment →
            </button>
          </form>
        )}

        {showReview && !isConfirmed && (
          <div>
            <h2 className="text-xl font-bold text-white">Review payment</h2>
            <p className="mt-2 text-sm text-slate-400">
              Check the details before confirming.
            </p>

  <div className="mt-5 space-y-4 rounded-xl border border-slate-800 bg-slate-950 p-5">
    <div className="flex justify-between gap-4">
     <span className="text-slate-400">Recipient</span>
    <span className="text-right font-medium text-white">{recipientName}</span>
    </div>
    <div className="flex justify-between gap-4">
      <span className="text-slate-400">UPI ID</span>
     <span className="break-all text-right font-medium text-white">{upiID}</span>
     </div>
      <div className="flex justify-between gap-4">
      <span className="text-slate-400">Amount</span>
      <span className="font-semibold text-white">₹{money(Number(amount))}</span>
      </div>
       <div className="flex justify-between gap-4">
       <span className="text-slate-400">Note</span>
         <span className="text-right text-white">{note.trim() || '—'}</span>
           </div>
            </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
      <button type="button" onClick={() => setShowReview(false)}
                className="flex-1 rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-200 hover:bg-slate-800" >
                Back to edit
        </button>
        <button type="button" onClick={handleConfirmPayment}
                className="flex-1 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-500">
                Confirm payment
              </button>
            </div>
          </div>
        )}

        {isConfirmed && (
          <div className="py-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-3xl text-emerald-400">
              ✓
            </div>
            <h2 className="mt-5 text-2xl font-bold text-white">
              Payment successful
            </h2>
            <p className="mt-2 text-slate-400">
              ₹{money(Number(amount))} recorded for {recipientName}.
            </p>
            <p className="mt-3 text-sm text-slate-500">
              This is a demo payment. No real money is transferred.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
        <button onClick={handleNewPayment}
        className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-500" >
                Send another payment
              </button>
      <button onClick={() => onNavigate('transactions')}
     className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-200 hover:bg-slate-800" >
       View transactions
    </button>
     </div>
    </div>
     )}
      </div>
    </div>
  )
}

export default SendMoney
