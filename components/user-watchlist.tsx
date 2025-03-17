"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Clock, ArrowUpRight, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getUserWatchlist, removeFromWatchlist } from "@/services/auctionService"
import { useToast } from "@/hooks/use-toast"
import { formatTimeLeft } from "@/lib/utils"

export default function UserWatchlist() {
  const [filter, setFilter] = useState("all")
  const [watchlist, setWatchlist] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        setLoading(true)
        // Get watchlist from localStorage
        const watchlistIds = JSON.parse(localStorage.getItem('favorites') || '[]')
        
        if (watchlistIds.length === 0) {
          setWatchlist([])
          return
        }
        
        // Fetch details for each item in the watchlist
        const response = await getUserWatchlist(watchlistIds)
        console.log('Watchlist items:', response)
        
        // Format the data
        const watchlistData = response.data || response
        
        if (Array.isArray(watchlistData)) {
          setWatchlist(watchlistData.map(item => ({
            id: item._id,
            auctionId: item._id,
            title: item.title || 'Untitled Item',
            image: item.images && item.images.length > 0 
              ? item.images[0] 
              : "/placeholder.svg?height=80&width=80",
            currentBid: item.currentBid || item.startingBid || 0,
            bids: item.bids || 0,
            endTime: new Date(item.endDate),
            addedTime: new Date() // We don't track when items were added to favorites
          })))
        }
      } catch (error) {
        console.error('Failed to load watchlist:', error)
        toast({
          title: "Erreur",
          description: "Impossible de charger vos favoris",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchWatchlist()
  }, [toast])

  // Filter watchlist based on selected filter
  const filteredWatchlist =
    filter === "all"
      ? watchlist
      : filter === "ending-soon"
        ? watchlist.filter((item) => {
            const timeLeft = item.endTime.getTime() - new Date().getTime()
            return timeLeft > 0 && timeLeft < 86400000 // Less than 24 hours
          })
        : watchlist.filter((item) => {
            const timeLeft = item.endTime.getTime() - new Date().getTime()
            return timeLeft > 86400000 // More than 24 hours
          })

  // Function to remove item from watchlist
  const handleRemoveFromWatchlist = async (id: string) => {
    try {
      // Remove from local state
      setWatchlist((prev) => prev.filter((item) => item.id !== id))
      
      // Remove from localStorage
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
      const newFavorites = favorites.filter((itemId: string) => itemId !== id)
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
      
      // Call API to remove from watchlist (if needed)
      // await removeFromWatchlist(id)
      
      toast({
        title: "Supprimé des favoris",
        description: "L'article a été retiré de vos favoris",
      })
    } catch (error) {
      console.error('Failed to remove from watchlist:', error)
      toast({
        title: "Erreur",
        description: "Impossible de retirer l'article de vos favoris",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Vos Favoris</h3>
          <div className="w-[180px] h-10 bg-muted animate-pulse rounded" />
        </div>
        <div className="rounded-md border">
          <div className="h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="text-lg font-medium">Vos Favoris</h3>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filtrer par temps" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les Articles</SelectItem>
            <SelectItem value="ending-soon">Se termine bientôt (24h)</SelectItem>
            <SelectItem value="later">Se termine plus tard</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Article</TableHead>
              <TableHead>Enchère Actuelle</TableHead>
              <TableHead>Enchères</TableHead>
              <TableHead>Se Termine</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredWatchlist.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                  Aucun article dans vos favoris
                </TableCell>
              </TableRow>
            ) : (
              filteredWatchlist.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded-md">
                        <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                      </div>
                      <div className="font-medium line-clamp-1">{item.title}</div>
                    </div>
                  </TableCell>
                  <TableCell>{item.currentBid} €</TableCell>
                  <TableCell>{item.bids}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                      <span>{formatTimeLeft(item.endTime)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/auctions/${item.auctionId}`}>
                        <Button variant="outline" size="sm" className="h-8 gap-1">
                          <span>Voir</span>
                          <ArrowUpRight className="h-3 w-3" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-destructive"
                        onClick={() => handleRemoveFromWatchlist(item.id)}
                      >
                        <Heart className="h-4 w-4 fill-current" />
                        <span className="sr-only">Retirer des favoris</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

