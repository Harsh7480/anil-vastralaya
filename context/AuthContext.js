'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { fetchAPI } from '@/utils/api'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetchAPI('/auth/me')
        .then((userData) => {
          setUser(userData)
        })
        .catch(() => {
          localStorage.removeItem('token')
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const register = useCallback(async (name, email, password) => {
    const result = await fetchAPI('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    })
    localStorage.setItem('token', result.token)
    setUser(result.user)
    return result
  }, [])

  const login = useCallback(async (email, password) => {
    const result = await fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    localStorage.setItem('token', result.token)
    setUser(result.user)
    return result
  }, [])

  const logout = useCallback(async () => {
    try {
      const token = localStorage.getItem('token')
      if (token) {
        await fetchAPI('/auth/logout', { method: 'POST' })
      }
    } catch {}
    localStorage.removeItem('token')
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
