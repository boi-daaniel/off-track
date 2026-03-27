import { useEffect, useMemo, useState } from 'react'
import AllowanceForm from '../components/AllowanceForm'
import ExpenseForm from '../components/ExpenseForm'
import SpendingChart from '../components/SpendingChart'
import StatCard from '../components/StatCard'
import TransactionList from '../components/TransactionList'
import { useAuth } from '../hooks/useAuth'
import { createAllowance, createExpense, getAllowances, getExpenses } from '../services/trackerService'
import { formatCurrency } from '../utils/formatters'

function DashboardPage() {
  const { user } = useAuth()
  const [allowances, setAllowances] = useState([])
  const [expenses, setExpenses] = useState([])
  const [pageLoading, setPageLoading] = useState(true)
  const [allowanceLoading, setAllowanceLoading] = useState(false)
  const [expenseLoading, setExpenseLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadDashboard() {
      try {
        setPageLoading(true)
        setError('')
        const [allowanceEntries, expenseEntries] = await Promise.all([getAllowances(user.id), getExpenses(user.id)])
        setAllowances(allowanceEntries)
        setExpenses(expenseEntries)
      } catch (serviceError) {
        setError(serviceError.message || 'Failed to load dashboard data.')
      } finally {
        setPageLoading(false)
      }
    }

    if (user?.id) {
      loadDashboard()
    }
  }, [user?.id])

  const totals = useMemo(() => {
    const totalAllowance = allowances.reduce((sum, item) => sum + Number(item.amount), 0)
    const totalExpenses = expenses.reduce((sum, item) => sum + Number(item.amount), 0)

    return {
      totalAllowance,
      totalExpenses,
      remainingBalance: totalAllowance - totalExpenses,
    }
  }, [allowances, expenses])

  const recentTransactions = useMemo(() => expenses.slice(0, 5), [expenses])

  const chartData = useMemo(() => {
    const grouped = expenses.reduce((accumulator, expense) => {
      const category = expense.category || 'Other'
      accumulator[category] = (accumulator[category] ?? 0) + Number(expense.amount)
      return accumulator
    }, {})

    return Object.entries(grouped)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
  }, [expenses])

  async function handleCreateAllowance(values) {
    try {
      setAllowanceLoading(true)
      setError('')
      const newAllowance = await createAllowance({
        userId: user.id,
        amount: values.amount,
        frequency: values.frequency,
      })
      setAllowances((current) => [newAllowance, ...current])
    } catch (serviceError) {
      setError(serviceError.message || 'Failed to save allowance.')
    } finally {
      setAllowanceLoading(false)
    }
  }

  async function handleCreateExpense(values) {
    try {
      setExpenseLoading(true)
      setError('')
      const newExpense = await createExpense({
        userId: user.id,
        amount: values.amount,
        category: values.category,
        description: values.description,
      })
      setExpenses((current) => [newExpense, ...current])
    } catch (serviceError) {
      setError(serviceError.message || 'Failed to save expense.')
    } finally {
      setExpenseLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-600">Dashboard</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">Track allowance with confidence</h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-500 sm:text-base">
            See allowance, expenses, recent transactions, and category spending in one clean workspace.
          </p>
        </div>

        <div className="rounded-3xl border border-emerald-100 bg-emerald-50 px-5 py-4">
          <p className="text-sm font-medium text-emerald-700">Remaining balance</p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">{formatCurrency(totals.remainingBalance)}</p>
        </div>
      </section>

      {error ? <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-600">{error}</p> : null}

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="Total Allowance"
          value={formatCurrency(totals.totalAllowance)}
          hint={`${allowances.length} allowance entries recorded`}
          accent="bg-cyan-50 text-cyan-700"
        />
        <StatCard
          label="Total Expenses"
          value={formatCurrency(totals.totalExpenses)}
          hint={`${expenses.length} expense entries recorded`}
          accent="bg-rose-50 text-rose-700"
        />
        <StatCard
          label="Recent Activity"
          value={recentTransactions.length.toString()}
          hint="Latest expenses shown below"
          accent="bg-amber-50 text-amber-700"
        />
      </section>

      {pageLoading ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-sm text-slate-500">
          Loading your allowance and expense data...
        </div>
      ) : (
        <>
          <section className="grid gap-4 xl:grid-cols-2">
            <AllowanceForm onSubmit={handleCreateAllowance} loading={allowanceLoading} />
            <ExpenseForm onSubmit={handleCreateExpense} loading={expenseLoading} />
          </section>

          <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
            <TransactionList expenses={expenses} />
            <SpendingChart data={chartData} />
          </section>
        </>
      )}
    </div>
  )
}

export default DashboardPage
