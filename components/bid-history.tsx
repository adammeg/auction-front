"use client"

import { useState, useEffect } from "react"
import { User } from "lucide-react"
import { getBidsForItem } from "@/services/auctionService"
import { useToast } from "@/hooks/use-toast"

interface BidHistoryProps {
  itemId: string
}

export default function BidHistory({ itemId }: BidHistoryProps) {
  const [bids, setBids] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const loadBids = async () => {
      try {
        setLoading(true)
        const response = await getBidsForItem(itemId)
        console.log('Bid history:', response)
        
        const bidsData = response.data || response
        setBids(Array.isArray(bidsData) ? bidsData : [])
      } catch (error) {
        console.error('Failed to load bid history:', error)
        toast({
          title: "Erreur",
          description: "Impossible de charger l'historique des enchères",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadBids()
  }, [itemId, toast])

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (bids.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-muted-foreground">Aucune enchère n'a encore été placée.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {bids.map((bid, index) => (
        <div key={bid._id} className="flex items-start gap-3 pb-3 border-b last:border-0">
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
            <User className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{bid.bidder?.username || "Utilisateur inconnu"}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(bid.createdAt).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <p className="font-bold">{bid.amount} €</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 