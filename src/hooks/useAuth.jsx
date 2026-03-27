import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { supabase } from '../services/supabaseClient'
import { signInWithPassword, signUpWithPassword, signOutUser } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function initializeSession() {
      const { data, error } = await supabase.auth.getSession()

      if (!error && isMounted) {
        setSession(data.session)
      }

      if (isMounted) {
        setLoading(false)
      }
    }

    initializeSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      setLoading(false)
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  const value = useMemo(
    () => ({
      session,
      user: session?.user ?? null,
      loading,
      signUpWithPassword,
      signInWithPassword,
      signOutUser,
    }),
    [session, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
