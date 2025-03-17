"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Clock, User, Tag, Info, Package, Calendar, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { getAuctionById } from "@/services/auctionService"
import BidForm from "@/components/bid-form"
import BidHistory from "@/components/bid-history"
import { formatTimeLeft } from "@/lib/utils"
import RelatedAuctions from "@/components/related-auctions"

export default function AuctionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [auction, setAuction] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const loadAuction = async () => {
      try {
        setLoading(true)
        const data = await getAuctionById(params.id as string)
        console.log('Auction details:', data)
        
        // Format the data
        const auctionData = data || data
        setAuction(auctionData)
        
        // Check if auction is in favorites
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
        setIsFavorite(favorites.includes(auctionData?._id))
      } catch (error: any) {
        console.error('Failed to load auction:', error)
        setError(error.message || 'Failed to load auction details')
        toast({
          title: "Erreur",
          description: "Impossible de charger les détails de l'enchère",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      loadAuction()
    }
  }, [params.id, toast])

  const toggleFavorite = () => {
    if (!auction) return
    
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    let newFavorites
    
    if (isFavorite) {
      newFavorites = favorites.filter((id: string) => id !== auction._id)
      toast({
        title: "Retiré des favoris",
        description: "Cette enchère a été retirée de vos favoris",
      })
    } else {
      newFavorites = [...favorites, auction._id]
      toast({
        title: "Ajouté aux favoris",
        description: "Cette enchère a été ajoutée à vos favoris",
      })
    }
    
    localStorage.setItem('favorites', JSON.stringify(newFavorites))
    setIsFavorite(!isFavorite)
  }

  const handleBidPlaced = async () => {
    // Refresh auction data after a bid is placed
    try {
      const data = await getAuctionById(params.id as string)
      setAuction(data || data)
    } catch (error) {
      console.error('Failed to refresh auction data:', error)
    }
  }

  if (loading) {
    return (
      <div className="container py-8 flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error || !auction) {
    return (
      <div className="container py-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Erreur</h1>
          <p className="text-muted-foreground mb-6">{error || "Impossible de charger les détails de l'enchère"}</p>
          <Button onClick={() => router.back()}>Retour</Button>
        </div>
      </div>
    )
  }

  const isEnded = new Date(auction.endDate) < new Date() || auction.status === 'ended'
  const currentBid = auction.currentBid || auction.startBid
  const minIncrement = auction.minIncrement || 1

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Retour aux enchères
        </Button>
        <h1 className="text-2xl md:text-3xl font-bold">{auction.title}</h1>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant={isEnded ? "destructive" : "default"}>
            {isEnded ? "Enchère terminée" : "Enchère en cours"}
          </Badge>
          {auction.featured && (
            <Badge variant="secondary">En vedette</Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            <div className="relative aspect-video overflow-hidden rounded-lg border">
              <Image
                src={auction.images && auction.images.length > 0 
                  ? auction.images[selectedImage] 
                  : "/placeholder.svg?height=600&width=800"}
                alt={auction.title}
                fill
                className="object-contain"
              />
            </div>
            
            {auction.images && auction.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {auction.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border ${
                      selectedImage === index ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${auction.title} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <Tabs defaultValue="description">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Détails</TabsTrigger>
              <TabsTrigger value="bids">Enchères</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="p-4 border rounded-md mt-2">
              <h3 className="font-semibold text-lg mb-2">Description</h3>
              <p className="whitespace-pre-line">{auction.description || "Aucune description disponible."}</p>
            </TabsContent>
            <TabsContent value="details" className="p-4 border rounded-md mt-2">
              <h3 className="font-semibold text-lg mb-4">Détails de l'article</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Tag className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Catégorie</p>
                    <p className="text-muted-foreground">{auction.category?.name || "Non catégorisé"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Package className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">État</p>
                    <p className="text-muted-foreground">{auction.itemCondition || auction.condition || "Non spécifié"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Calendar className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Date de fin</p>
                    <p className="text-muted-foreground">
                      {new Date(auction.endDate).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <User className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Vendeur</p>
                    <p className="text-muted-foreground">{auction.seller?.username || "Vendeur inconnu"}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="bids" className="p-4 border rounded-md mt-2">
              <h3 className="font-semibold text-lg mb-4">Historique des enchères</h3>
              <BidHistory itemId={auction._id} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">Enchère actuelle</p>
                  <p className="text-2xl font-bold">{currentBid} €</p>
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <p>Incrément minimum</p>
                  <p>{minIncrement} €</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                {isEnded ? (
                  <span className="text-destructive font-medium">Enchère terminée</span>
                ) : (
                  <span>Fin dans {formatTimeLeft(auction.endDate)}</span>
                )}
              </div>

              <Separator />

              {isEnded ? (
                <div className="bg-muted p-4 rounded-md text-center">
                  <p className="font-medium">Cette enchère est terminée</p>
                  {auction.highestBidder ? (
                    <p className="text-sm text-muted-foreground mt-1">
                      Remportée par {auction.highestBidder.username} pour {currentBid} €
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground mt-1">
                      Aucune enchère n'a été placée
                    </p>
                  )}
                </div>
              ) : (
                <BidForm 
                  currentBid={currentBid} 
                  minIncrement={minIncrement} 
                  auctionId={auction._id}
                  onBidPlaced={handleBidPlaced}
                />
              )}

              <Button 
                variant="outline" 
                className="w-full" 
                onClick={toggleFavorite}
              >
                <Heart className={`mr-2 h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                {isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">Informations sur le vendeur</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">{auction.seller?.username || "Vendeur inconnu"}</p>
                  <p className="text-xs text-muted-foreground">Membre depuis {new Date(auction.seller?.createdAt || Date.now()).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}</p>
                </div>
              </div>
              <Link href={`/seller/${auction.seller?._id}`}>
                <Button variant="outline" className="w-full">Voir le profil du vendeur</Button>
              </Link>
            </CardContent>
          </Card>

          <div className="bg-muted p-4 rounded-md">
            <div className="flex items-start gap-2">
              <Info className="h-5 w-5 mt-0.5 text-muted-foreground flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                En plaçant une enchère, vous vous engagez à acheter cet article si vous êtes le gagnant. Assurez-vous de lire la description complète et de poser des questions au vendeur si nécessaire.
              </p>
            </div>
          </div>
        </div>
      </div>

      {auction.category && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Enchères similaires</h2>
          <RelatedAuctions 
            categoryId={auction.category._id} 
            currentAuctionId={auction._id} 
            limit={4}
          />
        </div>
      )}
    </div>
  )
}

