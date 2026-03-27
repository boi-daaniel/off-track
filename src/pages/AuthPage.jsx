import { useState } from 'react'
import AuthForm from '../components/AuthForm'
import { useAuth } from '../hooks/useAuth'

function AuthPage() {
  const [mode, setMode] = useState('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const { signInWithPassword, signUpWithPassword } = useAuth()

  async function handleSubmit(credentials) {
    try {
      setLoading(true)
      setError('')
      setMessage('')

      if (mode === 'login') {
        await signInWithPassword(credentials)
      } else {
        const data = await signUpWithPassword(credentials)
        setMessage(
          data.session
            ? 'Account created. You are now signed in.'
            : 'Account created. Check your email to confirm your account if confirmation is enabled.',
        )
      }
    } catch (serviceError) {
      setError(serviceError.message || 'Authentication failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/60 bg-white/80 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.45)] backdrop-blur lg:grid-cols-[1.1fr_0.9fr]">
        <section className="bg-slate-950 px-8 py-10 text-white sm:px-12 sm:py-14">
          <p className="inline-flex rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-300">
            Personal Finance
          </p>
          <h1 className="mt-6 max-w-md text-4xl font-semibold leading-tight sm:text-5xl">
            Stay on top of allowance and everyday spending.
          </h1>
          <p className="mt-6 max-w-lg text-base text-slate-300">
            Off Track gives you a clear balance, recent expenses, and category insights in one simple dashboard.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-slate-300">Allowance</p>
              <p className="mt-2 text-2xl font-semibold">$420.00</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-slate-300">Expenses</p>
              <p className="mt-2 text-2xl font-semibold">$187.45</p>
            </div>
          </div>
        </section>

        <section className="px-6 py-10 sm:px-10 sm:py-12">
          <div className="mx-auto max-w-md">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-600">
              {mode === 'login' ? 'Welcome back' : 'Create your account'}
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">
              {mode === 'login' ? 'Log in to your dashboard' : 'Start tracking your money'}
            </h2>
            <p className="mt-3 text-sm text-slate-500">
              Use Supabase Auth to securely sign up and access your protected dashboard.
            </p>

            {message ? <p className="mt-6 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</p> : null}

            <div className="mt-8">
              <AuthForm mode={mode} onSubmit={handleSubmit} loading={loading} error={error} />
            </div>

            <button
              type="button"
              onClick={() => {
                setMode((current) => (current === 'login' ? 'signup' : 'login'))
                setError('')
                setMessage('')
              }}
              className="mt-6 text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AuthPage
