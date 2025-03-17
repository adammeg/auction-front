"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Clock, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatTimeLeft } from "@/lib/utils"
import { Auction } from "@/types/auction"

interface AuctionGridProps {
  auctions: Auction[];
  viewMode?: "grid" | "list";
}

export default function AuctionGrid({ auctions, viewMode = "grid" }: AuctionGridProps) {
  const [favorites, setFavorites] = useState<string[]>(() => {
    // Initialize favorites from localStorage if available
    if (typeof window !== "undefined") {
      const savedFavorites = localStorage.getItem("favorites")
      return savedFavorites ? JSON.parse(savedFavorites) : []
    }
    return []
  })

  const toggleFavorite = (id: string) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter((itemId: string) => itemId !== id)
      : [...favorites, id]
    
    setFavorites(newFavorites)
    localStorage.setItem("favorites", JSON.stringify(newFavorites))
  }

  if (!auctions || auctions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Aucune enchère disponible pour le moment</p>
      </div>
    )
  }

  if (viewMode === "list") {
    return (
      <div className="space-y-4">
        {auctions.map((auction: Auction) => (
          <Card key={auction._id} className="overflow-hidden">
            <div className="flex flex-col sm:flex-row">
              <div className="w-full sm:w-48 md:w-64">
                <Link href={`/auctions/${auction._id}`}>
                  <div className="aspect-square sm:aspect-[4/3] relative">
                    <Image
                      src={auction.images?.[0] || "/placeholder.svg"}
                      alt={auction.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>
              </div>
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <Link href={`/auctions/${auction._id}`} className="hover:underline">
                      <h3 className="font-semibold">{auction.title}</h3>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => toggleFavorite(auction._id)}
                    >
                      <Heart className={`h-4 w-4 ${favorites.includes(auction._id) ? "fill-red-500 text-red-500" : ""}`} />
                      <span className="sr-only">Ajouter aux favoris</span>
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {auction.description}
                  </p>
                  <div className="text-sm flex flex-wrap gap-x-4 gap-y-2 mb-4">
                    <div>
                      <span className="text-muted-foreground">Catégorie: </span>
                      <span className="font-medium">{auction.category?.name || "Non catégorisé"}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Vendeur: </span>
                      <span className="font-medium">{auction.seller?.username || "Inconnu"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span>{formatTimeLeft(auction.endDate || auction.endTime || new Date())}</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-muted-foreground">Enchère actuelle</p>
                    <p className="text-lg font-bold">
                      {(auction.currentBid || auction.startingBid || 0).toLocaleString('fr-FR')} €
                    </p>
                  </div>
                  <Link href={`/auctions/${auction._id}`}>
                    <Button>Voir l'enchère</Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {auctions.map((auction: Auction) => (
        <Card key={auction._id} className="overflow-hidden h-full flex flex-col">
          <div className="relative">
            <Link href={`/auctions/${auction._id}`}>
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={auction.images?.[0] || "/placeholder.svg"}
                  alt={auction.title}
                  width={600}
                  height={400}
                  className="object-cover transition-transform hover:scale-105 h-full w-full"
                />
              </div>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-full h-8 w-8"
              onClick={() => toggleFavorite(auction._id)}
            >
              <Heart
                className={`h-4 w-4 ${favorites.includes(auction._id) ? "fill-red-500 text-red-500" : ""}`}
              />
              <span className="sr-only">Ajouter aux favoris</span>
            </Button>
            {auction.featured && (
              <Badge className="absolute top-2 left-2" variant="secondary">
                En vedette
              </Badge>
            )}
          </div>
          <CardContent className="p-4 flex-grow">
            <Link href={`/auctions/${auction._id}`} className="hover:underline">
              <h3 className="font-semibold line-clamp-1 mb-1">{auction.title}</h3>
            </Link>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {auction.description}
            </p>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mt-auto">
              <div>
                <p className="text-sm font-medium">Enchère actuelle</p>
                <p className="text-lg font-bold">
                  {(auction.currentBid || auction.startingBid || 0).toLocaleString('fr-FR')} €
                </p>
              </div>
              <div className="text-left sm:text-right">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatTimeLeft(auction.endDate || auction.endTime || new Date())}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Link href={`/auctions/${auction._id}`} className="w-full">
              <Button variant="outline" className="w-full">
                Voir l'enchère
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

