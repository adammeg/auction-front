"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, isAuthenticated, getCurrentUser, logout } from '@/services/authService'

interface UserContextType {
  user: User | null
  isAuthenticated: boolean
  logout: () => void
  refreshUser: () => void
}

const UserContext = createContext<UserContextType>({
  user: null,
  isAuthenticated: false,
  logout: () => {},
  refreshUser: () => {}
})

export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [authStatus, setAuthStatus] = useState(false)

  const refreshUser = () => {
    const authCheck = isAuthenticated()
    setAuthStatus(authCheck)
    
    if (authCheck) {
      const currentUser = getCurrentUser()
      setUser(currentUser)
    } else {
      setUser(null)
    }
  }

  useEffect(() => {
    refreshUser()
    
    // Listen for storage events (for when user logs in/out in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token' || e.key === 'user') {
        refreshUser()
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const handleLogout = () => {
    logout()
    setUser(null)
    setAuthStatus(false)
  }

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated: authStatus,
        logout: handleLogout,
        refreshUser
      }}
    >
      {children}
    </UserContext.Provider>
  )
}