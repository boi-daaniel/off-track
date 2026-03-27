import { useState } from 'react'
import FormCard from './FormCard'

const initialState = {
  amount: '',
  frequency: 'weekly',
}

function AllowanceForm({ onSubmit, loading }) {
  const [form, setForm] = useState(initialState)

  async function handleSubmit(event) {
    event.preventDefault()
    await onSubmit({
      amount: Number(form.amount),
      frequency: form.frequency,
    })
    setForm(initialState)
  }

  return (
    <FormCard title="Add Allowance" subtitle="Track recurring weekly or monthly allowance income.">
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
            placeholder="100.00"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Frequency</span>
          <select
            value={form.frequency}
            onChange={(event) => setForm((current) => ({ ...current, frequency: event.target.value }))}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-slate-400 focus:bg-white"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-slate-950 px-4 py-3 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Saving...' : 'Save allowance'}
        </button>
      </form>
    </FormCard>
  )
}

export default AllowanceForm
