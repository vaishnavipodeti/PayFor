
import { createContext, useContext, useState } from 'react'

const PayFlowContext = createContext()

export function PayFlowProvider({ children }) {
  const [balance, setBalance] = useState(5000)
  const [transactions, setTransactions] = useState([])

  function sendMoney(recipientName, upiID, amount, note) {
    const numericAmount = Number(amount)

    if (numericAmount <= 0 || numericAmount > balance) {
      return false
    }

    const newTransaction = {
      id: Date.now(),
      recipientName,
      upiID,
      amount: numericAmount,
      note,
      type: 'Payment',
      status: 'Successful',
      date: new Date().toLocaleString(),
    }

    setBalance((currentBalance) => currentBalance - numericAmount)

    setTransactions((currentTransactions) => [
      newTransaction,
      ...currentTransactions,
    ])

    return true
  }

  function refundTransaction(transactionId) {
    const transaction = transactions.find(
      (item) => item.id === transactionId
    )

    if (!transaction || transaction.status !== 'Successful') {
      return false
    }

    setBalance((currentBalance) => currentBalance + transaction.amount)

    setTransactions((currentTransactions) =>
      currentTransactions.map((item) =>
        item.id === transactionId
          ? { ...item, status: 'Refunded' }
          : item
      )
    )

    return true
  }

  return (
    <PayFlowContext.Provider
      value={{
        balance,
        transactions,
        sendMoney,
        refundTransaction,
      }}
    >
      {children}
    </PayFlowContext.Provider>
  )
}

export function usePayFlow() {
  return useContext(PayFlowContext)
}
