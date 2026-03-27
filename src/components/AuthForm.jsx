import { useState } from 'react'

const initialState = {
  email: '',
  password: '',
}

function AuthForm({ mode, onSubmit, loading, error }) {
  const [form, setForm] = useState(initialState)
  const isLogin = mode === 'login'

  async function handleSubmit(event) {
    event.preventDefault()
    await onSubmit(form)
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-slate-700">Email</span>
        <input
          required
          type="email"
          value={form.email}
          onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-slate-400 focus:bg-white"
          placeholder="you@example.com"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
        <input
          required
          minLength={6}
          type="password"
          value={form.password}
          onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-slate-400 focus:bg-white"
          placeholder="Minimum 6 characters"
        />
      </label>

      {error ? <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-600">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-2xl bg-slate-950 px-4 py-3 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? 'Please wait...' : isLogin ? 'Log in' : 'Create account'}
      </button>
    </form>
  )
}

export default AuthForm
