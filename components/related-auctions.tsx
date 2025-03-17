"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Clock } from "lucide-react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getRelatedAuctions } from "@/services/auctionService"
import { formatTimeLeft } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

interface RelatedAuctionsProps {
  categoryId: string
  currentAuctionId: string
  limit?: number
}

export default function RelatedAuctions({ categoryId, currentAuctionId, limit = 4 }: RelatedAuctionsProps) {
  const [relatedAuctions, setRelatedAuctions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchRelatedAuctions = async () => {
      try {
        setLoading(true)
        const data = await getRelatedAuctions(categoryId, currentAuctionId, limit)
        console.log('Related auctions:', data)
        
        // Format the data
        const auctionsData = data.data || data
        
        if (Array.isArray(auctionsData)) {
          setRelatedAuctions(auctionsData.map(item => ({
            _id: item._id,
            title: item.title || 'Untitled Auction',
            category: item.category || { _id: 'unknown', name: 'Uncategorized' },
            images: item.images && item.images.length > 0 
              ? item.images 
              : ['/placeholder.svg?height=400&width=600'],
            currentBid: item.currentBid || item.startingBid || 0,
            bids: item.bids || 0,
            endDate: item.endDate || new Date().toISOString(),
            status: item.status || 'active'
          })))
        }
      } catch (error) {
        console.error('Failed to load related auctions:', error)
        toast({
          title: "Erreur",
          description: "Impossible de charger les enchères similaires",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    if (categoryId) {
      fetchRelatedAuctions()
    }
  }, [categoryId, currentAuctionId, limit, toast])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {[...Array(limit)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="aspect-[4/3] bg-muted animate-pulse" />
            <CardContent className="p-4">
              <div className="h-4 bg-muted animate-pulse rounded mb-2" />
              <div className="h-6 bg-muted animate-pulse rounded w-1/2 mb-2" />
              <div className="h-4 bg-muted animate-pulse rounded w-1/3" />
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <div className="h-10 bg-muted animate-pulse rounded w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (relatedAuctions.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-muted-foreground">Aucune enchère similaire trouvée.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {relatedAuctions.map((auction) => (
        <Card key={auction._id} className="overflow-hidden">
          <Link href={`/auctions/${auction._id}`}>
            <div className="aspect-[4/3] overflow-hidden">
              <Image
                src={auction.images[0] || "/placeholder.svg"}
                alt={auction.title}
                width={400}
                height={300}
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
          </Link>
          <CardContent className="p-4">
            <div className="space-y-2">
              <Link href={`/auctions/${auction._id}`} className="hover:underline">
                <h3 className="font-semibold line-clamp-1">{auction.title}</h3>
              </Link>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <div>
                  <p className="text-sm font-medium">Enchère Actuelle</p>
                  <p className="text-lg font-bold">{auction.currentBid} €</p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-sm font-medium">{auction.bids} enchères</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatTimeLeft(auction.endDate)}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Link href={`/auctions/${auction._id}`} className="w-full">
              <Button variant="outline" className="w-full">
                Voir l'Enchère
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

