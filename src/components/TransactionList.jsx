import { formatCurrency, formatDate } from '../utils/formatters'

function TransactionList({ expenses }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Recent Transactions</h2>
          <p className="mt-1 text-sm text-slate-500">Latest expenses first.</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {expenses.length} entries
        </span>
      </div>

      <div className="space-y-3">
        {expenses.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-8 text-center text-sm text-slate-500">
            No expenses yet. Add your first one to start tracking transactions.
          </div>
        ) : (
          expenses.map((expense) => (
            <article
              key={expense.id}
              className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold text-slate-900">{expense.category}</p>
                <p className="text-sm text-slate-500">{expense.description || 'No description provided'}</p>
              </div>
              <div className="text-left sm:text-right">
                <p className="font-semibold text-rose-500">-{formatCurrency(expense.amount)}</p>
                <p className="text-sm text-slate-500">{formatDate(expense.created_at)}</p>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  )
}

export default TransactionList
