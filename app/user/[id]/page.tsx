"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Star, Clock, Package, CalendarDays, Award } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AuctionGrid from "@/components/auction-grid"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import ErrorDisplay from "@/components/error-display"
import LoadingSpinner from "@/components/loading-spinner"

import { getUserById, getUserListingsById, getUserStats } from "@/services/userService"
import { normalizeResponse } from "@/lib/apiUtils"
import { formatDateSafe } from "@/lib/dateUtils"
import { getSafeImageUrl } from "@/lib/imageUtils"
import { Auction } from "@/types/auction"

export default function UserProfilePage() {
  const params = useParams()
  const router = useRouter()
  const userId = params?.id as string
  
  const [user, setUser] = useState<any>(null)
  const [userListings, setUserListings] = useState<Auction[]>([])
  const [userSold, setUserSold] = useState<Auction[]>([])
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return
      
      try {
        setLoading(true)
        setError(null)
        
        // Fetch user details
        const userData = await getUserById(userId)
        if (!userData) {
          throw new Error("Utilisateur introuvable")
        }
        setUser(userData)
        
        // Fetch user listings
        let listingsData = await getUserListingsById(userId)
        listingsData = normalizeResponse<Auction>(listingsData)
        
        if (Array.isArray(listingsData)) {
          // Split active and sold listings
          const active = listingsData.filter(listing => listing.status === 'active')
          const sold = listingsData.filter(listing => listing.status === 'ended')
          
          setUserListings(active)
          setUserSold(sold)
        }
        
        // Fetch user stats
        const statsData = await getUserStats(userId)
        setStats(statsData)
        
      } catch (err) {
        console.error("Error fetching user data:", err)
        setError(err instanceof Error ? err.message : "Impossible de charger les informations de l'utilisateur")
      } finally {
        setLoading(false)
      }
    }
    
    if (userId) {
      fetchUserData()
    }
  }, [userId])
  
  if (loading) {
    return (
      <div className="container py-12 px-4 md:px-6">
        <LoadingSpinner text="Chargement du profil utilisateur..." />
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="container py-12 px-4 md:px-6">
        <ErrorDisplay 
          message={error} 
          onRetry={() => window.location.reload()}
        />
      </div>
    )
  }
  
  if (!user) {
    return (
      <div className="container py-12 px-4 md:px-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Utilisateur introuvable</h2>
          <p className="text-muted-foreground mb-6">L'utilisateur que vous recherchez n'existe pas ou a été supprimé.</p>
          <Button onClick={() => router.back()}>Retour</Button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container py-12 px-4 md:px-6">
      <div className="flex flex-col gap-8">
        {/* Back button */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-fit"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* User Profile Card */}
          <Card className="flex-1">
            <CardHeader className="pb-2">
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.avatar ? getSafeImageUrl(user.avatar) : ""} alt={user.username} />
                  <AvatarFallback className="text-2xl">
                    {user.username?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <CardTitle className="text-2xl">{user.username}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <CalendarDays className="h-3 w-3" />
                    Membre depuis {user.createdAt 
                      ? formatDateSafe(user.createdAt, 'MMMM yyyy')
                      : "récemment"}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              {user.bio && (
                <div className="mb-6">
                  <h3 className="font-medium mb-2">À propos</h3>
                  <p className="text-muted-foreground">{user.bio}</p>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <Package className="h-5 w-5 mb-2 text-primary" />
                  <p className="text-xl font-bold">{stats?.totalListings || 0}</p>
                  <p className="text-sm text-muted-foreground">Articles mis en vente</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <Clock className="h-5 w-5 mb-2 text-primary" />
                  <p className="text-xl font-bold">{stats?.activeBids || 0}</p>
                  <p className="text-sm text-muted-foreground">Enchères actives</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <Award className="h-5 w-5 mb-2 text-primary" />
                  <p className="text-xl font-bold">{stats?.completedSales || 0}</p>
                  <p className="text-sm text-muted-foreground">Ventes réalisées</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="listings" className="space-y-4">
          <TabsList>
            <TabsTrigger value="listings">Enchères actives ({userListings.length})</TabsTrigger>
            <TabsTrigger value="sold">Enchères terminées ({userSold.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="listings" className="mt-6">
            {userListings.length > 0 ? (
              <AuctionGrid auctions={userListings} />
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">
                    Cet utilisateur n'a aucune enchère active pour le moment.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="sold" className="mt-6">
            {userSold.length > 0 ? (
              <AuctionGrid auctions={userSold} />
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">
                    Cet utilisateur n'a encore vendu aucun article.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

