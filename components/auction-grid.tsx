"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Clock, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getActiveAuctions } from "@/services/auctionService"
import { formatTimeLeft } from "@/lib/utils"
import { Auction } from "@/types/auction"

interface AuctionGridProps {
  auctions?: Auction[]
  showFeaturedOnly?: boolean
  limit?: number
}

export default function AuctionGrid({ auctions: propAuctions, showFeaturedOnly = false, limit }: AuctionGridProps) {
  const [auctions, setAuctions] = useState<Auction[]>(propAuctions || [])
  const [loading, setLoading] = useState(!propAuctions)
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    // If auctions are provided as props, use them
    if (propAuctions) {
      setAuctions(propAuctions)
      setLoading(false)
      return
    }

    // Otherwise, fetch auctions from the API
    const fetchAuctions = async () => {
      try {
        setLoading(true)
        const data = await getActiveAuctions()
        
        // Apply filters if needed
        let filteredData = data
        if (showFeaturedOnly) {
          filteredData = data.filter((auction: Auction) => auction.featured)
        }
        
        // Apply limit if provided
        if (limit && limit > 0) {
          filteredData = filteredData.slice(0, limit)
        }
        
        setAuctions(filteredData)
      } catch (error) {
        console.error("Failed to load auctions:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAuctions()
  }, [propAuctions, showFeaturedOnly, limit])

  useEffect(() => {
    // Load favorites from localStorage
    const storedFavorites = localStorage.getItem('favorites')
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

  const toggleFavorite = (id: string) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter(item => item !== id)
      : [...favorites, id]
    
    setFavorites(newFavorites)
    localStorage.setItem('favorites', JSON.stringify(newFavorites))
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Card key={i} className="overflow-hidden">
            <div className="aspect-[4/3] bg-muted animate-pulse" />
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <div className="h-8 bg-muted animate-pulse rounded w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (auctions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Aucune enchère disponible pour le moment.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {auctions.map((auction) => (
        <Card key={auction._id} className="overflow-hidden">
          <Link href={`/auctions/${auction._id}`} className="relative block">
            <div className="aspect-[4/3] relative">
              <Image
                src={auction.images && auction.images.length > 0 ? auction.images[0] : "/placeholder.svg"}
                alt={auction.title}
                fill
                className="object-cover"
              />
              {auction.featured && (
                <Badge className="absolute top-2 left-2 bg-yellow-500 hover:bg-yellow-600">
                  Vedette
                </Badge>
              )}
              <Button
                variant="ghost"
                size="icon"
                className={`absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 ${
                  favorites.includes(auction._id) ? "text-red-500" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  toggleFavorite(auction._id)
                }}
              >
                <Heart
                  className={`h-4 w-4 ${favorites.includes(auction._id) ? "fill-current" : ""}`}
                />
                <span className="sr-only">Ajouter aux favoris</span>
              </Button>
            </div>
          </Link>
          <CardContent className="p-4">
            <Link href={`/auctions/${auction._id}`}>
              <h3 className="font-medium line-clamp-1 hover:underline">{auction.title}</h3>
            </Link>
            <div className="flex items-center justify-between mt-2 text-sm">
              <div className="flex items-center text-muted-foreground">
                <Clock className="mr-1 h-3 w-3" />
                <span>{formatTimeLeft(new Date(auction.endTime || auction.endDate || new Date()))}</span>
              </div>
              <span>{auction.bids || 0} enchères</span>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <div className="flex w-full justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Enchère actuelle</p>
                <p className="font-medium">{auction.currentBid || auction.startingBid} €</p>
              </div>
              <Link href={`/auctions/${auction._id}`}>
                <Button size="sm">Enchérir</Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

