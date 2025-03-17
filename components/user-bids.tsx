"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Clock, ArrowUpRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getUserBids } from "@/services/auctionService"
import { useToast } from "@/hooks/use-toast"
import { formatTimeLeft } from "@/lib/utils"

export default function UserBids() {
  const [filter, setFilter] = useState("all")
  const [userBids, setUserBids] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchUserBids = async () => {
      try {
        setLoading(true)
        const response = await getUserBids()
        console.log('User bids:', response)
        
        // Format the data
        const bidsData = response.data || response
        
        if (Array.isArray(bidsData)) {
          setUserBids(bidsData.map(bid => {
            // Determine bid status
            let status = 'pending'
            
            if (bid.item.status === 'ended') {
              status = bid.item.highestBidder === bid.bidder._id ? 'won' : 'lost'
            } else {
              status = bid.amount === bid.item.currentBid ? 'winning' : 'outbid'
            }
            
            return {
              id: bid._id,
              auctionId: bid.item._id,
              title: bid.item.title,
              image: bid.item.images && bid.item.images.length > 0 
                ? bid.item.images[0] 
                : "/placeholder.svg?height=80&width=80",
              bidAmount: bid.amount,
              currentBid: bid.item.currentBid || bid.item.startingBid,
              bidTime: new Date(bid.createdAt),
              endTime: new Date(bid.item.endDate),
              status
            }
          }))
        }
      } catch (error) {
        console.error('Failed to load user bids:', error)
        toast({
          title: "Erreur",
          description: "Impossible de charger vos enchères",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchUserBids()
  }, [toast])

  // Filter bids based on selected filter
  const filteredBids = filter === "all" ? userBids : userBids.filter((bid) => bid.status === filter)

  // Function to format the bid time
  const formatBidTime = (bidTime: Date) => {
    return bidTime.toLocaleString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Function to get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "winning":
        return <Badge className="bg-green-500">En tête</Badge>
      case "outbid":
        return <Badge variant="destructive">Dépassé</Badge>
      case "won":
        return <Badge className="bg-green-500">Remporté</Badge>
      case "lost":
        return <Badge variant="secondary">Perdu</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="text-lg font-medium">Vos Enchères</h3>
          <div className="w-full sm:w-[180px] h-10 bg-muted animate-pulse rounded" />
        </div>
        <div className="rounded-md border overflow-x-auto">
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
        <h3 className="text-lg font-medium">Vos Enchères</h3>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les Enchères</SelectItem>
            <SelectItem value="winning">En tête</SelectItem>
            <SelectItem value="outbid">Dépassé</SelectItem>
            <SelectItem value="won">Remporté</SelectItem>
            <SelectItem value="lost">Perdu</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Article</TableHead>
              <TableHead className="hidden md:table-cell">Votre Enchère</TableHead>
              <TableHead>Enchère Actuelle</TableHead>
              <TableHead className="hidden md:table-cell">Heure de l'Enchère</TableHead>
              <TableHead>Se Termine</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBids.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                  Aucune enchère trouvée
                </TableCell>
              </TableRow>
            ) : (
              filteredBids.map((bid) => (
                <TableRow key={bid.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded-md">
                        <Image src={bid.image || "/placeholder.svg"} alt={bid.title} fill className="object-cover" />
                      </div>
                      <div className="font-medium line-clamp-1">{bid.title}</div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{bid.bidAmount} €</TableCell>
                  <TableCell>{bid.currentBid} €</TableCell>
                  <TableCell className="hidden md:table-cell">{formatBidTime(bid.bidTime)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                      <span>{formatTimeLeft(bid.endTime)}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(bid.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/auctions/${bid.auctionId}`}>
                        <Button variant="outline" size="sm" className="h-8 gap-1">
                          <span className="hidden sm:inline">Voir</span>
                          <ArrowUpRight className="h-3 w-3" />
                        </Button>
                      </Link>
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

