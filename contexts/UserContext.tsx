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

// Update refreshUser method to be more robust
const refreshUser = () => {
  try {
    const authCheck = isAuthenticated()
    setAuthStatus(authCheck)
    
    if (authCheck) {
      const currentUser = getCurrentUser()
      // Add null check before setting user
      if (currentUser) {
        setUser(currentUser)
      } else {
        // If token exists but user data doesn't, clean up the inconsistent state
        console.warn("Token exists but no user data found, logging out")
        logout()
        setUser(null)
        setAuthStatus(false)
      }
    } else {
      setUser(null)
    }
  } catch (error) {
    console.error("Error refreshing user:", error)
    // Clean up on error
    logout()
    setUser(null)
    setAuthStatus(false)
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