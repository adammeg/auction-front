"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Clock, ArrowUpRight, Pencil, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { getUserListings } from "@/services/auctionService"
import { useToast } from "@/hooks/use-toast"
import { formatTimeLeft } from "@/lib/utils"

export default function UserListings() {
  const [filter, setFilter] = useState("all")
  const [userListings, setUserListings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchUserListings = async () => {
      try {
        setLoading(true)
        const response = await getUserListings()
        console.log('User listings:', response)
        
        // Format the data
        const listingsData = response.data || response
        
        if (Array.isArray(listingsData)) {
          setUserListings(listingsData.map(item => ({
            id: item._id,
            title: item.title || 'Untitled Item',
            image: item.images && item.images.length > 0 
              ? item.images[0] 
              : "/placeholder.svg?height=80&width=80",
            startingBid: item.startingBid || item.startBid || 0,
            currentBid: item.currentBid || 0,
            bids: item.bids || 0,
            endTime: new Date(item.endDate),
            status: item.status || 'active',
            createdAt: new Date(item.createdAt)
          })))
        }
      } catch (error) {
        console.error('Failed to load user listings:', error)
        toast({
          title: "Erreur",
          description: "Impossible de charger vos annonces",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchUserListings()
  }, [toast])

  // Filter listings based on selected filter
  const filteredListings = filter === "all" ? userListings : userListings.filter((listing) => listing.status === filter)

  // Function to get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Actif</Badge>
      case "sold":
        return <Badge className="bg-blue-500">Vendu</Badge>
      case "ended":
        return <Badge variant="secondary">Terminé</Badge>
      case "draft":
        return <Badge variant="outline">Brouillon</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Vos Annonces</h3>
          <div className="flex items-center gap-2">
            <div className="w-[180px] h-10 bg-muted animate-pulse rounded" />
            <div className="h-10 w-24 bg-muted animate-pulse rounded" />
          </div>
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
        <h3 className="text-lg font-medium">Vos Annonces</h3>
        <div className="flex items-center gap-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les Annonces</SelectItem>
              <SelectItem value="active">Actives</SelectItem>
              <SelectItem value="sold">Vendues</SelectItem>
              <SelectItem value="ended">Terminées</SelectItem>
              <SelectItem value="draft">Brouillons</SelectItem>
            </SelectContent>
          </Select>
          <Link href="/dashboard/create-auction">
            <Button size="sm">Créer une Annonce</Button>
          </Link>
        </div>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Article</TableHead>
              <TableHead>Prix de Départ</TableHead>
              <TableHead>Enchère Actuelle</TableHead>
              <TableHead>Enchères</TableHead>
              <TableHead>Se Termine</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredListings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                  Aucune annonce trouvée
                </TableCell>
              </TableRow>
            ) : (
              filteredListings.map((listing) => (
                <TableRow key={listing.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded-md">
                        <Image
                          src={listing.image || "/placeholder.svg"}
                          alt={listing.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="font-medium line-clamp-1">{listing.title}</div>
                    </div>
                  </TableCell>
                  <TableCell>{listing.startingBid} €</TableCell>
                  <TableCell>{listing.currentBid > 0 ? `${listing.currentBid} €` : "Aucune enchère"}</TableCell>
                  <TableCell>{listing.bids}</TableCell>
                  <TableCell>
                    {listing.status === "draft" ? (
                      "Non publié"
                    ) : (
                      <div className="flex items-center">
                        <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                        <span>{formatTimeLeft(listing.endTime)}</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{getStatusBadge(listing.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {listing.status !== "draft" && (
                        <Link href={`/auctions/${listing.id}`}>
                          <Button variant="outline" size="sm" className="h-8 gap-1">
                            <span>Voir</span>
                            <ArrowUpRight className="h-3 w-3" />
                          </Button>
                        </Link>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Plus</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" />
                            <span>Modifier</span>
                          </DropdownMenuItem>
                          {listing.status === "draft" && (
                            <DropdownMenuItem>
                              <span>Publier</span>
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-destructive">
                            <span>Supprimer</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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

