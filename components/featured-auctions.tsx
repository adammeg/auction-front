"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Clock, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getFeaturedAuctions, Auction } from "@/services/auctionService"
import { useToast } from "@/components/ui/use-toast"

export default function FeaturedAuctions() {
  const [favorites, setFavorites] = useState<string[]>([])
  const [auctions, setAuctions] = useState<Auction[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const loadAuctions = async () => {
      try {
        const data = await getFeaturedAuctions();
        console.log('Featured auctions loaded:', data);
        
        // Check if data is an array
        if (!Array.isArray(data)) {
          console.error('Expected array but got:', typeof data);
          setAuctions([]);
          return;
        }
        
        // Map the backend data to the format expected by the component
        const formattedAuctions = data.map(item => {
          console.log('Processing item:', item);
          return {
            _id: item._id || 'unknown',
            title: item.title || 'Untitled Auction',
            description: item.description || '',
            category: item.category || { _id: 'unknown', name: 'Uncategorized' },
            condition: item.condition || 'Unknown',
            images: item.images && item.images.length > 0 
              ? item.images 
              : ['/placeholder.svg?height=400&width=600'],
            startingBid: item.startingBid || 0,
            currentBid: item.currentBid || 0,
            bids: item.bids || 0,
            seller: item.seller || { _id: 'unknown', username: 'Unknown Seller' },
            endTime: item.endTime || new Date().toISOString(),
            status: item.status || 'active',
            featured: item.featured || false,
            createdAt: item.createdAt || new Date().toISOString()
          };
        });
        
        setAuctions(formattedAuctions);
      } catch (error) {
        console.error("Failed to load auctions:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les enchères en vedette.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadAuctions();
  }, [toast]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]))
  }

  // Fonction pour formater le temps restant
  const formatTimeLeft = (endTime: string) => {
    const end = new Date(endTime)
    const now = new Date()
    const diff = end.getTime() - now.getTime()

    if (diff <= 0) return "Terminé"

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (days > 0) return `${days}j ${hours}h restants`
    if (hours > 0) return `${hours}h ${minutes}m restants`
    return `${minutes}m restants`
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="aspect-[4/3] bg-muted animate-pulse" />
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="h-5 bg-muted animate-pulse rounded" />
                <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <div>
                    <div className="h-4 bg-muted animate-pulse rounded w-24" />
                    <div className="h-6 bg-muted animate-pulse rounded w-16 mt-1" />
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="h-4 bg-muted animate-pulse rounded w-20" />
                    <div className="h-4 bg-muted animate-pulse rounded w-28 mt-1" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <div className="h-9 bg-muted animate-pulse rounded w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
      {auctions.map((auction) => (
        <Card key={auction._id} className="overflow-hidden">
          <CardHeader className="p-0">
            <div className="relative">
              <Link href={`/auctions/${auction._id}`}>
                <div className="aspect-[4/3] overflow-hidden">
                  <Image
                    src={auction.images[0] || "/placeholder.svg?height=400&width=600"}
                    alt={auction.title}
                    width={600}
                    height={400}
                    className="object-cover transition-transform hover:scale-105"
                  />
                </div>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-full"
                onClick={() => toggleFavorite(auction._id)}
              >
                <Heart className={`h-5 w-5 ${favorites.includes(auction._id) ? "fill-red-500 text-red-500" : ""}`} />
                <span className="sr-only">Ajouter aux favoris</span>
              </Button>
              {auction.featured && (
                <Badge className="absolute top-2 left-2" variant="secondary">
                  En vedette
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-2">
              <Link href={`/auctions/${auction._id}`} className="hover:underline">
                <h3 className="font-semibold line-clamp-1">{auction.title}</h3>
              </Link>
              <p className="text-sm text-muted-foreground">{auction.category.name}</p>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <div>
                  <p className="text-sm font-medium">Enchère actuelle</p>
                  <p className="text-lg font-bold">{auction.currentBid} DT</p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-sm font-medium">{auction.bids} enchères</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatTimeLeft(auction.endTime)}
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

