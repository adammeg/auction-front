"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useUser } from "@/contexts/UserContext"
import { login } from "@/services/authService"
import { useToast } from "@/components/ui/use-toast"

export default function AuthTest() {
  const { user, isAuthenticated, logout } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleTestLogin = async () => {
    setIsLoading(true)
    try {
      // Make sure we're passing email and password as separate arguments
      const response = await login(
        "test@example.com", 
        "password123"
      )
      toast({
        title: "Test Login Successful",
        description: `Logged in as: ${response.user.username}`,
      })
    } catch (error: any) {
      console.error("Test login error:", error)
      toast({
        title: "Test Login Failed",
        description: error.message || "Authentication failed",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-4 border rounded-md">
      <h2 className="text-xl font-bold mb-4">Authentication Test</h2>
      
      <div className="mb-4">
        <p><strong>Status:</strong> {isAuthenticated ? "Authenticated" : "Not authenticated"}</p>
        {user && (
          <div className="mt-2">
            <p><strong>User:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>
        )}
      </div>
      
      <div className="flex gap-2">
        <Button onClick={handleTestLogin} disabled={isLoading}>
          {isLoading ? "Testing..." : "Test Login"}
        </Button>
        
        {isAuthenticated && (
          <Button variant="destructive" onClick={logout}>
            Test Logout
          </Button>
        )}
      </div>
    </div>
  )
} 