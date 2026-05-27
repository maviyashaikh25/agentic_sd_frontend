import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { api } from '../lib/api'

const AuthContext = createContext(null)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('auth_token'))
  const [loading, setLoading] = useState(true)
  const [authError, setAuthError] = useState('')

  // Verify token and fetch profile on startup or token change
  useEffect(() => {
    let active = true
    const fetchUser = async () => {
      if (!token) {
        if (active) {
          setUser(null)
          setLoading(false)
        }
        return
      }

      try {
        setLoading(true)
        const userData = await api.getMe()
        if (active) {
          setUser(userData)
        }
      } catch (err) {
        console.error('Session validation failed:', err)
        // Clear invalid token
        if (active) {
          localStorage.removeItem('auth_token')
          setToken(null)
          setUser(null)
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    fetchUser()
    return () => {
      active = false
    }
  }, [token])

  const login = useCallback(async (username, password) => {
    setAuthError('')
    try {
      const response = await api.login(username, password)
      const { token: userToken, user: userData } = response
      localStorage.setItem('auth_token', userToken)
      setToken(userToken)
      setUser(userData)
      return userData
    } catch (err) {
      const msg = err.message || 'Login failed'
      setAuthError(msg)
      throw new Error(msg)
    }
  }, [])

  const register = useCallback(async (username, password) => {
    setAuthError('')
    try {
      const response = await api.register(username, password)
      const { token: userToken, user: userData } = response
      localStorage.setItem('auth_token', userToken)
      setToken(userToken)
      setUser(userData)
      return userData
    } catch (err) {
      const msg = err.message || 'Registration failed'
      setAuthError(msg)
      throw new Error(msg)
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('auth_token')
    setToken(null)
    setUser(null)
    setAuthError('')
  }, [])

  const value = {
    user,
    token,
    loading,
    authError,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    setAuthError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
