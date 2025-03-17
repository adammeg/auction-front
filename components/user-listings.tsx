"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Clock, ArrowRight, Edit, PenSquare } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { formatTimeLeft } from "@/lib/utils"
import { getUserListings } from "@/services/auctionService"

export default function UserListings() {
  const [listings, setListings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await getUserListings()
        console.log("User listings:", response)
        
        // Handle different response structures
        if (response && response.data) {
          setListings(response.data)
        } else if (Array.isArray(response)) {
          setListings(response)
        } else {
          setListings([])
        }
      } catch (err) {
        console.error("Failed to fetch user listings:", err)
        setError(err instanceof Error ? err.message : "Failed to load your listings")
      } finally {
        setLoading(false)
      }
    }
    
    fetchListings()
  }, [])
  
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col sm:flex-row gap-4 p-4">
                <Skeleton className="h-24 w-24 rounded-md" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-4 w-36" />
                  <div className="flex justify-between items-end pt-2">
                    <div>
                      <Skeleton className="h-4 w-24 mb-1" />
                      <Skeleton className="h-5 w-20" />
                    </div>
                    <Skeleton className="h-9 w-28" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="rounded-lg border border-destructive/50 p-4 text-center">
        <p className="text-destructive mb-2">Une erreur s'est produite</p>
        <p className="text-sm text-muted-foreground mb-4">{error}</p>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => window.location.reload()}
        >
          Réessayer
        </Button>
      </div>
    )
  }
  
  if (listings.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="mb-2">Vous n'avez créé aucune enchère</p>
        <p className="text-sm text-muted-foreground mb-4">Commencez à vendre vos articles maintenant</p>
        <Link href="/dashboard/create-auction">
          <Button>Créer une enchère</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {listings.map((listing) => (
        <Card key={listing._id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row gap-4 p-4">
              <Link href={`/auctions/${listing._id}`}>
                <div className="relative h-24 w-24 rounded-md overflow-hidden">
                  <Image
                    src={listing.images?.[0] || "/placeholder.svg"}
                    alt={listing.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <Link href={`/auctions/${listing._id}`} className="hover:underline">
                    <h3 className="font-semibold">{listing.title}</h3>
                  </Link>
                  <Badge 
                    variant={listing.status === 'active' ? "outline" : "secondary"}
                  >
                    {listing.status === 'active' ? "En cours" : 
                     listing.status === 'ended' ? "Terminée" : "Brouillon"}
                  </Badge>
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <Clock className="mr-1 h-3 w-3" />
                  {listing.status === 'active' 
                    ? `Se termine dans ${formatTimeLeft(listing.endDate || listing.endTime)}`
                    : listing.status === 'ended'
                    ? `Terminée le ${new Date(listing.endDate || listing.endTime).toLocaleDateString()}`
                    : "Non publiée"}
                </div>
                
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-muted-foreground">Enchère actuelle</p>
                    <p className="font-bold">{listing.currentBid > 0 
                      ? `${listing.currentBid.toLocaleString('fr-FR')} €` 
                      : listing.startingBid
                      ? `${listing.startingBid.toLocaleString('fr-FR')} €`
                      : "Aucune enchère"}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Link href={`/auctions/${listing._id}`}>
                      <Button size="sm" variant="outline" className="gap-2">
                        Voir l'enchère
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </Link>
                    
                    {listing.status !== 'ended' && (
                      <Link href={`/dashboard/edit-auction/${listing._id}`}>
                        <Button size="sm" variant="secondary" className="gap-2">
                          <PenSquare className="h-3 w-3" />
                          Éditer
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

