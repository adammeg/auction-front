"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { 
  Activity, Clock, Eye, Package, Plus, ChevronRight, DollarSign,
  Award, ListChecks, Tag, CalendarDays, Bell
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useUser } from "@/contexts/UserContext"
import { getUserListings, getUserBids } from "@/services/auctionService"
import LoadingSpinner from "@/components/loading-spinner"
import { useToast } from "@/components/ui/use-toast"
import { formatDateSafe } from "@/lib/dateUtils"
import { getSafeImageUrl } from "@/lib/imageUtils"
import { Auction, Bid } from "@/types/auction"

export default function DashboardPage() {
  const { user, isAuthenticated } = useUser()
  const { toast } = useToast()
  const [listings, setListings] = useState<Auction[]>([])
  const [bids, setBids] = useState<Bid[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!isAuthenticated) return;
      
      try {
        setLoading(true)
        
        // Fetch listings
        try {
          console.log("Fetching user listings...");
          const listingsResponse = await getUserListings();
          console.log("Raw listings response:", listingsResponse);
          
          // Extract listings data with better error handling
          let listingsData: Auction[] = [];
          
          if (listingsResponse?.data && Array.isArray(listingsResponse.data)) {
            listingsData = listingsResponse.data;
          } else if (Array.isArray(listingsResponse)) {
            listingsData = listingsResponse;
          }
          
          console.log("Processed listings data:", listingsData);
          setListings(listingsData);
        } catch (listingsError) {
          console.error("Error fetching listings:", listingsError);
          setError(true);
        }
        
        // Fetch bids
        try {
          console.log("Fetching user bids...");
          const bidsResponse = await getUserBids();
          console.log("Raw bids response:", bidsResponse);
          
          // Extract bids data with better error handling
          let bidsData: Bid[] = [];
          
          if (bidsResponse?.data && Array.isArray(bidsResponse.data)) {
            bidsData = bidsResponse.data;
          } else if (Array.isArray(bidsResponse)) {
            bidsData = bidsResponse;
          }
          
          console.log("Processed bids data:", bidsData);
          setBids(bidsData);
        } catch (bidsError) {
          console.error("Error fetching bids:", bidsError);
          setError(true);
        }
      } catch (err) {
        console.error("Error in dashboard data fetching:", err)
        setError(true)
        
        toast({
          title: "Erreur lors du chargement",
          description: "Impossible de charger les données du tableau de bord. Réessayez plus tard.",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }
    
    fetchDashboardData()
  }, [isAuthenticated, toast])

  if (!isAuthenticated) {
    return (
      <div className="container py-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Accès restreint</h1>
          <p className="text-muted-foreground mb-6">
            Vous devez être connecté pour accéder à votre tableau de bord
          </p>
          <Link href="/auth/login?callbackUrl=/dashboard">
            <Button>Se connecter</Button>
          </Link>
        </div>
      </div>
    )
  }
  
  // Calculate stats from listings and bids with safer filtering
  const activeListings = listings?.filter(item => item?.status === 'active')?.length || 0
  const completedListings = listings?.filter(item => item?.status === 'ended')?.length || 0
  const activeBidsCount = bids?.length || 0
  
  // Safe accessor functions for nested properties
  const getListingPrice = (listing: Auction): number => {
    if (!listing) return 0;
    return typeof listing.currentBid === 'number' ? listing.currentBid : 
           typeof listing.startingBid === 'number' ? listing.startingBid : 0;
  }
  
  const getBidItemTitle = (bid: Bid): string => {
    if (!bid) return "Enchère";
    if (typeof bid.item === 'object' && bid.item !== null) {
      return bid.item.title || "Enchère sans titre";
    }
    return "Enchère";
  }
  
  const getBidItemId = (bid: Bid): string => {
    if (!bid) return "";
    if (typeof bid.item === 'object' && bid.item !== null) {
      return bid.item._id || "";
    }
    return typeof bid.item === 'string' ? bid.item : "";
  }
  
  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Tableau de bord</h1>
            <p className="text-muted-foreground">
              Bienvenue, {user?.username || "utilisateur"} ! Gérez vos enchères et suivez votre activité.
            </p>
          </div>
          <Link href="/dashboard/create-auction">
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Créer une enchère
            </Button>
          </Link>
        </div>
        
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Erreur</AlertTitle>
            <AlertDescription>
              Impossible de charger certaines données du tableau de bord. Certaines informations peuvent être incomplètes.
            </AlertDescription>
          </Alert>
        )}
        
        {loading ? (
          <LoadingSpinner text="Chargement de votre tableau de bord..." />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Enchères actives</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{activeListings}</div>
                  <p className="text-xs text-muted-foreground">Vos enchères en cours</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Enchères terminées</CardTitle>
                  <Tag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{completedListings}</div>
                  <p className="text-xs text-muted-foreground">Vos ventes passées</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Enchères placées</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{activeBidsCount}</div>
                  <p className="text-xs text-muted-foreground">Vos mises actives</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Date d'inscription</CardTitle>
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3 mb-4">
                    <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                    <TabsTrigger value="listings">Mes enchères</TabsTrigger>
                    <TabsTrigger value="bids">Mes mises</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-4">
                    {(listings.length === 0 && bids.length === 0) ? (
                      <Card>
                        <CardHeader>
                          <CardTitle>Bienvenue sur votre dashboard !</CardTitle>
                          <CardDescription>Commencez à enchérir ou à vendre des articles</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center py-10 space-y-6">
                          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                            <Tag className="h-8 w-8 text-primary" />
                          </div>
                          <div className="text-center max-w-md">
                            <h3 className="text-lg font-medium mb-2">Votre tableau de bord est prêt</h3>
                            <p className="text-muted-foreground mb-4">
                              Votre activité apparaîtra ici. Commencez à enchérir sur des articles ou créez votre première enchère.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                              <Link href="/auctions">
                                <Button variant="outline">Explorer les enchères</Button>
                              </Link>
                              <Link href="/dashboard/create-auction">
                                <Button>Créer une enchère</Button>
                              </Link>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card>
                        <CardHeader>
                          <CardTitle>Activité récente</CardTitle>
                          <CardDescription>Vos dernières actions sur la plateforme</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {listings.slice(0, 3).map((listing) => (
                            <div key={listing._id || `listing-${Math.random()}`} className="flex items-center gap-4">
                              <div className="rounded-full bg-primary/10 p-2">
                                <Package className="h-4 w-4 text-primary" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium">Vous avez créé l'enchère "{listing.title || 'Sans titre'}"</p>
                                <p className="text-xs text-muted-foreground">
                                  {formatDateSafe(listing.createdAt, 'dd MMM yyyy')}
                                </p>
                              </div>
                              <Button variant="ghost" size="icon" asChild>
                                <Link href={`/auctions/${listing._id}`}>
                                  <ChevronRight className="h-4 w-4" />
                                  <span className="sr-only">Voir l'enchère</span>
                                </Link>
                              </Button>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    )}
                    
                    {listings.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Vos enchères actives</CardTitle>
                          <CardDescription>Gérez vos enchères en cours</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {listings
                              .filter(item => item?.status === 'active')
                              .slice(0, 3)
                              .map((listing) => (
                                <div key={listing._id || `active-${Math.random()}`} className="flex justify-between items-center">
                                  <div className="flex items-center gap-3">
                                    <div className="relative h-10 w-10 rounded overflow-hidden">
                                      <Image 
                                        src={listing.images?.[0] ? getSafeImageUrl(listing.images[0]) : "/placeholder.svg"}
                                        alt={listing.title || "Enchère"}
                                        fill
                                        className="object-cover"
                                      />
                                    </div>
                                    <div>
                                      <p className="font-medium">{listing.title || "Sans titre"}</p>
                                      <p className="text-sm text-muted-foreground">
                                        {getListingPrice(listing).toLocaleString('fr-FR')} DT
                                      </p>
                                    </div>
                                  </div>
                                  <Button asChild variant="outline" size="sm">
                                    <Link href={`/auctions/${listing._id}`}>Voir</Link>
                                  </Button>
                                </div>
                              ))}
                            
                            {listings.filter(item => item?.status === 'active').length > 0 && (
                              <div className="text-center pt-2">
                                <Link href="/my-listings">
                                  <Button variant="link" className="text-xs">
                                    Voir toutes mes enchères <ChevronRight className="h-3 w-3 ml-1" />
                                  </Button>
                                </Link>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="listings" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Mes enchères</CardTitle>
                        <CardDescription>Enchères que vous avez créées</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {listings.length > 0 ? (
                          <div className="space-y-4">
                            {listings.slice(0, 5).map((listing) => (
                              <div key={listing._id || `listing-${Math.random()}`} className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                  <div className="relative h-10 w-10 rounded overflow-hidden">
                                    <Image 
                                      src={listing.images?.[0] ? getSafeImageUrl(listing.images[0]) : "/placeholder.svg"}
                                      alt={listing.title || "Enchère"}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <div>
                                    <p className="font-medium">{listing.title || "Sans titre"}</p>
                                    <p className="text-sm text-muted-foreground">
                                      Statut: {
                                        listing.status === 'active' ? 'Active' : 
                                        listing.status === 'ended' ? 'Terminée' : 
                                        listing.status === 'draft' ? 'Brouillon' : 
                                        'Inconnu'
                                      }
                                    </p>
                                  </div>
                                </div>
                                <Button asChild size="sm">
                                  <Link href={`/auctions/${listing._id}`}>Voir</Link>
                                </Button>
                              </div>
                            ))}
                            <div className="text-center pt-4">
                              <Link href="/my-listings">
                                <Button variant="outline">Voir toutes mes enchères</Button>
                              </Link>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <p className="text-muted-foreground mb-4">Vous n'avez pas encore créé d'enchères</p>
                            <Link href="/dashboard/create-auction">
                              <Button>Créer une enchère</Button>
                            </Link>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="bids" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Mes mises</CardTitle>
                        <CardDescription>Enchères sur lesquelles vous avez misé</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {bids.length > 0 ? (
                          <div className="space-y-4">
                            {bids.slice(0, 5).map((bid) => (
                              <div key={bid._id || `bid-${Math.random()}`} className="flex justify-between items-center">
                                <div>
                                  <p className="font-medium">{getBidItemTitle(bid)}</p>
                                  <p className="text-sm text-muted-foreground">
                                    Votre mise: {(bid.amount || 0).toLocaleString('fr-FR')} DT
                                  </p>  
                                </div>
                                <Button asChild>
                                  <Link href={`/auctions/${getBidItemId(bid)}`}>Voir</Link>
                                </Button>
                              </div>
                            ))}
                            <div className="text-center pt-4">
                              <Link href="/my-bids">
                                <Button variant="outline">Voir toutes mes mises</Button>
                              </Link>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <p className="text-muted-foreground mb-4">Vous n'avez pas encore placé d'enchères</p>
                            <Link href="/auctions">
                              <Button>Explorer les enchères</Button>
                            </Link>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profil</CardTitle>
                    <CardDescription>Vos informations personnelles</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-6">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback className="text-lg">
                          {user?.username?.charAt(0)?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-bold text-lg">{user?.username || "Utilisateur"}</h3>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Email</p>
                        <p className="font-medium">{user?.email || "Non disponible"}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Nom</p>
                        <p className="font-medium">
                          {user?.firstName && user?.lastName 
                            ? `${user.firstName} ${user.lastName}`
                            : "Non renseigné"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Link href="/profile">
                        <Button variant="outline" className="w-full">
                          Gérer mon profil
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Actions rapides</CardTitle>
                    <CardDescription>Liens utiles</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Link href="/dashboard/create-auction" className="block">
                      <Button variant="outline" className="w-full flex justify-start gap-2">
                        <Plus className="h-4 w-4" />
                        Créer une enchère
                      </Button>
                    </Link>
                    <Link href="/auctions" className="block">
                      <Button variant="outline" className="w-full flex justify-start gap-2">
                        <Package className="h-4 w-4" />
                        Explorer les enchères
                      </Button>
                    </Link>
                    <Link href="/categories" className="block">
                      <Button variant="outline" className="w-full flex justify-start gap-2">
                        <ListChecks className="h-4 w-4" />
                        Parcourir les catégories
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

