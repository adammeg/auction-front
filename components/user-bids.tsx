"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Clock, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { formatTimeLeft } from "@/lib/utils"
import { getUserBids } from "@/services/auctionService"
import { Bid } from "@/types/auction"
import { getSafeImageUrl } from "@/lib/imageUtils"
import { formatDateSafe } from "@/lib/dateUtils"
import ErrorDisplay from "@/components/error-display"
import LoadingSpinner from "@/components/loading-spinner"

export default function UserBids() {
  const [bids, setBids] = useState<Bid[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const fetchBids = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await getUserBids()
        console.log("User bids:", response)
        
        // Handle different response structures
        if (response && response.data) {
          setBids(response.data)
        } else if (Array.isArray(response)) {
          setBids(response)
        } else if (response && Array.isArray(response.bids)) {
          // Handle possible new response format
          setBids(response.bids)
        } else {
          setBids([])
        }
      } catch (err) {
        console.error("Failed to fetch user bids:", err)
        setError(err instanceof Error ? err.message : "Failed to load your bids")
      } finally {
        setLoading(false)
      }
    }
    
    fetchBids()
  }, [])
  
  if (loading) {
    return <LoadingSpinner text="Chargement de vos enchères..." />
  }
  
  if (error) {
    return <ErrorDisplay message={error} onRetry={() => window.location.reload()} />
  }
  
  if (bids.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="mb-2">Vous n'avez encore placé aucune enchère</p>
        <p className="text-sm text-muted-foreground mb-4">Commencez à enchérir pour suivre vos enchères ici</p>
        <Link href="/auctions">
          <Button>Explorer les enchères</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {bids.map((bid) => {
        // Get item from bid, handling different response structures
        const item = typeof bid.item === 'object' ? bid.item : { _id: bid.item };
        
        return (
          <Card key={bid._id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col sm:flex-row gap-4 p-4">
                <Link href={`/auctions/${item._id}`}>
                  <div className="relative h-24 w-24 rounded-md overflow-hidden">
                    <Image
                      src={
                        'images' in item && item.images?.[0]
                          ? getSafeImageUrl(item.images[0])
                          : "/placeholder.svg"
                      }
                      alt={'title' in item ? item.title : "Enchère"}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <Link href={`/auctions/${item._id}`} className="hover:underline">
                      <h3 className="font-semibold">{'title' in item ? item.title : "Enchère"}</h3>
                    </Link>
                    <Badge 
                      variant={'status' in item && item.status === 'active' ? "outline" : "secondary"}
                    >
                      {'status' in item ? (item.status === 'active' ? "En cours" : "Terminée") : "Statut inconnu"}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Clock className="mr-1 h-3 w-3" />
                      {'endDate' in item && item.endDate
                      ? formatTimeLeft(new Date(item.endDate))
                      : 'endTime' in item && item.endTime
                      ? formatTimeLeft(new Date(item.endTime))
                      : "Date inconnue"}
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs text-muted-foreground">Votre enchère</p>
                      <p className="font-bold">{bid.amount.toLocaleString('fr-FR')} €</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDateSafe(bid.createdAt, 'dd MMM yyyy à HH:mm')}
                      </p>
                    </div>
                    
                    <Link href={`/auctions/${item._id}`}>
                      <Button size="sm" variant="outline" className="gap-2">
                        Voir l'enchère
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  )
}

