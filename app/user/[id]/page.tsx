import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Star, Clock, Package, Calendar, MapPin, Mail, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import AuctionGrid from "@/components/auction-grid"

// Données utilisateur fictives
const getUserData = (id: string) => {
  return {
    id: Number.parseInt(id),
    username: "CollectionVintage",
    name: "Alex Martin",
    avatar: "/placeholder.svg?height=200&width=200",
    rating: 4.9,
    reviews: 152,
    sales: 87,
    purchases: 65,
    joined: "Janvier 2019",
    location: "Paris, France",
    bio: "Collectionneur passionné de montres vintage, livres rares et meubles anciens. Je collectionne depuis plus de 15 ans et j'adore trouver des pièces uniques avec une histoire et du caractère.",
    specialties: ["Montres Vintage", "Livres Rares", "Meubles Anciens", "Art Déco"],
    badges: [
      { name: "Vendeur Vérifié", color: "bg-green-500" },
      { name: "Très Bien Noté", color: "bg-blue-500" },
      { name: "Expédition Rapide", color: "bg-purple-500" },
    ],
    stats: {
      responseRate: "98%",
      responseTime: "Moins de 2 heures",
      shippingTime: "1-2 jours ouvrables",
    },
  }
}

export default function UserProfilePage({ params }: { params: { id: string } }) {
  const user = getUserData(params.id)

  // Améliorer la responsivité de la page de profil utilisateur
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-6">
        <Link href="/auctions" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux Enchères
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="space-y-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative h-24 w-24 sm:h-32 sm:w-32 overflow-hidden rounded-full">
                <Image src={user.avatar || "/placeholder.svg"} alt={user.name} fill className="object-cover" />
              </div>
              <h1 className="mt-4 text-xl sm:text-2xl font-bold">{user.username}</h1>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{user.rating}</span>
                <span className="text-muted-foreground">({user.reviews} avis)</span>
              </div>
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                {user.badges.map((badge, index) => (
                  <Badge key={index} className={badge.color}>
                    {badge.name}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-4 rounded-lg border p-4">
              <div className="flex items-start gap-2">
                <Calendar className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Membre depuis</p>
                  <p className="text-sm text-muted-foreground">{user.joined}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Localisation</p>
                  <p className="text-sm text-muted-foreground">{user.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Package className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Transactions</p>
                  <p className="text-sm text-muted-foreground">
                    {user.sales} ventes • {user.purchases} achats
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Temps de réponse</p>
                  <p className="text-sm text-muted-foreground">{user.stats.responseTime}</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <h2 className="font-medium">Spécialités</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {user.specialties.map((specialty, index) => (
                  <Badge key={index} variant="outline">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>

            <Button className="w-full">
              <Mail className="mr-2 h-4 w-4" />
              Contacter le Vendeur
            </Button>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold">À propos de {user.name}</h2>
                <p className="mt-2 text-muted-foreground">{user.bio}</p>
              </CardContent>
            </Card>

            <Tabs defaultValue="listings" className="w-full">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="listings">Enchères Actives</TabsTrigger>
                <TabsTrigger value="sold">Articles Vendus</TabsTrigger>
                <TabsTrigger value="reviews">Avis</TabsTrigger>
              </TabsList>

              <TabsContent value="listings" className="mt-6">
                <AuctionGrid />
              </TabsContent>

              <TabsContent value="sold" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <Card key={item} className="overflow-hidden">
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={`/placeholder.svg?height=300&width=400&text=Article Vendu ${item}`}
                          alt={`Article Vendu ${item}`}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <Badge className="bg-red-500">Vendu</Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium line-clamp-1">Article Vintage {item}</h3>
                        <p className="text-sm text-muted-foreground">Vendu pour 350€</p>
                        <p className="text-xs text-muted-foreground">Mars 2025</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((review) => (
                    <Card key={review}>
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <div className="relative h-10 w-10 overflow-hidden rounded-full">
                              <Image
                                src={`/placeholder.svg?height=40&width=40&text=U${review}`}
                                alt={`Évaluateur ${review}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">Acheteur{review}</h3>
                                <div className="flex">
                                  {Array(5)
                                    .fill(0)
                                    .map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-3 w-3 ${i < 5 ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
                                      />
                                    ))}
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground">Mars {review + 10}, 2025</p>
                            </div>
                          </div>
                          <Link
                            href={`/auctions/${review}`}
                            className="flex items-center text-xs text-muted-foreground hover:text-foreground"
                          >
                            <span>Voir l'Article</span>
                            <ExternalLink className="ml-1 h-3 w-3" />
                          </Link>
                        </div>
                        <p className="mt-3 text-sm">
                          Excellent vendeur ! L'article était exactement comme décrit et l'expédition a été rapide. Très satisfait de mon achat et j'achèterais certainement à nouveau auprès de ce vendeur.
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

