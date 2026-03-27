import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { LogOut, Wallet } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

function AppLayout() {
  const { user, signOutUser } = useAuth()
  const [signingOut, setSigningOut] = useState(false)

  async function handleSignOut() {
    try {
      setSigningOut(true)
      await signOutUser()
    } finally {
      setSigningOut(false)
    }
  }

  return (
    <div className="min-h-screen bg-transparent px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-3xl border border-white/60 bg-white/75 p-6 shadow-[0_20px_70px_-35px_rgba(15,23,42,0.45)] backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
              <Wallet className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Allowance Tracker</p>
              <h1 className="text-xl font-semibold text-slate-900">Off Track</h1>
            </div>
          </div>

          <nav className="mt-8 space-y-2">
            <NavLink
              end
              to="/"
              className={({ isActive }) =>
                `flex items-center rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  isActive ? 'bg-slate-950 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              Dashboard
            </NavLink>
          </nav>

          <div className="mt-10 rounded-2xl bg-emerald-50 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-600">Signed in as</p>
            <p className="mt-2 truncate text-sm font-semibold text-slate-900">{user?.email}</p>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LogOut className="h-4 w-4" />
            {signingOut ? 'Signing out...' : 'Sign out'}
          </button>
        </aside>

        <main className="rounded-3xl border border-white/60 bg-white/75 p-4 shadow-[0_20px_70px_-35px_rgba(15,23,42,0.45)] backdrop-blur sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AppLayout
