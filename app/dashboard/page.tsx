"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Package, Heart, Settings, PlusCircle, DollarSign, BarChart3, ShoppingCart, Activity, Clock, Eye, ChevronRight, AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import UserBids from "@/components/user-bids"
import UserListings from "@/components/user-listings"
import UserWatchlist from "@/components/user-watchlist"
import { getUserDashboardStats } from "@/services/auctionService"
import { useToast } from "@/components/ui/use-toast"
import { formatTimeLeft } from "@/lib/utils"
import ProtectedRoute from "@/components/protected-route"
import { useUser } from "@/contexts/UserContext"
import LoadingSpinner from "@/components/loading-spinner"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function DashboardPage() {
  const { user, isAuthenticated } = useUser()
  const { toast } = useToast()
  const [stats, setStats] = useState({
    activeAuctions: 0,
    completedAuctions: 0,
    totalBids: 0,
    watchlistCount: 0,
    recentActivity: []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        const data = await getUserDashboardStats()
        setStats(data)
      } catch (err) {
        console.error("Error fetching dashboard data:", err)
        setError(true)
        
        toast({
          title: "Erreur lors du chargement",
          description: "Impossible de charger les statistiques du tableau de bord. Réessayez plus tard.",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }
    
    if (isAuthenticated) {
      fetchDashboardData()
    }
  }, [isAuthenticated, toast])

  return (
    <ProtectedRoute>
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tighter">Tableau de Bord</h1>
              <p className="text-muted-foreground">Gérez vos enchères, offres et paramètres de compte</p>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/dashboard/create-auction">
                <Button className="gap-1">
                  <PlusCircle className="h-4 w-4" />
                  <span>Créer une Enchère</span>
                </Button>
              </Link>
              <Link href="/dashboard/settings">
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                  <span className="sr-only">Paramètres</span>
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Enchères Actives</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{loading ? "..." : stats.activeAuctions}</div>
                <p className="text-xs text-muted-foreground">Enchères sur lesquelles vous avez misé</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Annonces Actives</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{loading ? "..." : stats.completedAuctions}</div>
                <p className="text-xs text-muted-foreground">Articles que vous vendez actuellement</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Liste de Suivi</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{loading ? "..." : stats.watchlistCount}</div>
                <p className="text-xs text-muted-foreground">Articles que vous suivez</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Enchères Remportées</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{loading ? "..." : stats.totalBids}</div>
                <p className="text-xs text-muted-foreground">Enchères que vous avez gagnées</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Activité d'Enchères</CardTitle>
                <CardDescription>Votre activité récente d'enchères et de ventes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted/30 rounded-md">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <BarChart3 className="h-8 w-8 text-muted-foreground" />
                    <div className="max-w-[160px]">
                      <p className="text-sm font-medium">Graphique d'Activité</p>
                      <p className="text-xs text-muted-foreground">
                        Visualisez votre activité d'enchères et de ventes au fil du temps
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Se Termine Bientôt</CardTitle>
                <CardDescription>Enchères que vous suivez qui se terminent bientôt</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="h-16 w-16 bg-muted animate-pulse rounded-md"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-muted animate-pulse rounded w-3/4"></div>
                          <div className="h-3 bg-muted animate-pulse rounded w-1/2"></div>
                          <div className="h-3 bg-muted animate-pulse rounded w-1/3"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : stats.recentActivity.length > 0 ? (
                  <div className="space-y-4">
                    {stats.recentActivity.map((item: any) => (
                      <div key={item.id} className="flex items-start gap-4">
                        <div className="relative aspect-square h-16 w-16 overflow-hidden rounded-md">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium line-clamp-1">{item.title}</p>
                            <Badge variant="outline" className="text-xs">
                              {formatTimeLeft(item.endTime)}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <p className="text-muted-foreground">Enchère Actuelle</p>
                            <p className="font-medium">{item.currentBid} €</p>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <p className="text-muted-foreground">Votre Enchère</p>
                            <p className="font-medium">
                              {item.userBid > 0 ? `${item.userBid} €` : "Aucune"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      Aucune enchère ne se termine bientôt
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Link href="/my-bids?filter=ending-soon" className="w-full">
                  <Button variant="outline" className="w-full">
                    Voir Tous les Articles Suivis
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

          <Tabs defaultValue="bids" className="space-y-4">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="bids">Mes Enchères</TabsTrigger>
              <TabsTrigger value="listings">Mes Annonces</TabsTrigger>
              <TabsTrigger value="watchlist">Liste de Suivi</TabsTrigger>
            </TabsList>
            <TabsContent value="bids" className="space-y-4">
              <UserBids />
            </TabsContent>
            <TabsContent value="listings" className="space-y-4">
              <UserListings />
            </TabsContent>
            <TabsContent value="watchlist" className="space-y-4">
              <UserWatchlist />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  )
}

