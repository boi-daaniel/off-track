import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">Checking session...</div>
  }

  if (!user) {
    return <Navigate to="/auth" replace />
  }

  return children
}

export default ProtectedRoute
