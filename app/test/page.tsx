"use client"

import { useState, useEffect } from "react"
import { getFeaturedAuctions } from "@/services/auctionService"
import AuthTest from "@/components/auth-test"

export default function TestPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getFeaturedAuctions()
        setData(result)
      } catch (err: any) {
        console.error("Error fetching featured auctions:", err)
        setError(err.displayMessage || "Failed to fetch featured auctions")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">API Test Page</h1>
      
      <div className="grid gap-8">
        <AuthTest />
        
        <div className="p-4 border rounded-md">
          <h2 className="text-xl font-bold mb-4">Featured Auctions API Test</h2>
          
          {loading && <p>Loading featured auctions...</p>}
          
          {error && (
            <div className="p-4 bg-red-50 text-red-700 rounded-md mb-4">
              <p className="font-semibold">Error:</p>
              <p>{error}</p>
            </div>
          )}
          
          {data && (
            <div>
              <p className="mb-2">Found {data.length} featured auctions</p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-96">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 