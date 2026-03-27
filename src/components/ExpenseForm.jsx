import { useState } from 'react'
import FormCard from './FormCard'

const initialState = {
  amount: '',
  category: '',
  description: '',
}

function ExpenseForm({ onSubmit, loading }) {
  const [form, setForm] = useState(initialState)

  async function handleSubmit(event) {
    event.preventDefault()
    await onSubmit({
      amount: Number(form.amount),
      category: form.category.trim(),
      description: form.description.trim(),
    })
    setForm(initialState)
  }

  return (
    <FormCard title="Add Expense" subtitle="Capture spending as it happens so your balance stays accurate.">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Amount</span>
          <input
            required
            min="0.01"
            step="0.01"
            type="number"
            value={form.amount}
            onChange={(event) => setForm((current) => ({ ...current, amount: event.target.value }))}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-slate-400 focus:bg-white"
            placeholder="18.50"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Category</span>
          <input
            required
            type="text"
            value={form.category}
            onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-slate-400 focus:bg-white"
            placeholder="Food"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Description</span>
          <textarea
            rows="4"
            value={form.description}
            onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-slate-400 focus:bg-white"
            placeholder="Lunch after class"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-emerald-500 px-4 py-3 font-medium text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Saving...' : 'Save expense'}
        </button>
      </form>
    </FormCard>
  )
}

export default ExpenseForm
