"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/contexts/UserContext"

interface ProtectedRouteProps {
  children: React.ReactNode
  redirectTo?: string
}

export default function ProtectedRoute({ 
  children, 
  redirectTo = "/auth/login" 
}: ProtectedRouteProps) {
  const { isAuthenticated } = useUser()
  const router = useRouter()

  useEffect(() => {
    if ( !isAuthenticated) {
      router.push(`${redirectTo}?redirect=${window.location.pathname}`)
    }
  }, [isAuthenticated, redirectTo, router])

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
} 