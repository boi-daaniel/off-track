import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import AppLayout from './components/AppLayout'
import AuthPage from './pages/AuthPage'
import DashboardPage from './pages/DashboardPage'
import { useAuth } from './hooks/useAuth'

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">Loading app...</div>
  }

  return (
    <Routes>
      <Route path="/auth" element={user ? <Navigate to="/" replace /> : <AuthPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
      </Route>
      <Route path="*" element={<Navigate to={user ? '/' : '/auth'} replace />} />
    </Routes>
  )
}

export default App
