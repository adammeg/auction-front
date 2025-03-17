"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Package, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import UserBids from "@/components/user-bids"
import ProtectedRoute from "@/components/protected-route"
import { Separator } from "@/components/ui/separator"
import UserWatchlist from "@/components/user-watchlist"

export default function MyBidsPage() {
  const router = useRouter()

  return (
    <ProtectedRoute>
      <div className="container py-8 px-4 md:px-6">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">Mon Activité d'Enchères</h1>
          </div>

          <Tabs defaultValue="bids" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 md:w-auto">
              <TabsTrigger value="bids">Mes Enchères</TabsTrigger>
              <TabsTrigger value="watching">Favoris</TabsTrigger>
            </TabsList>
            
            <TabsContent value="bids" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Mes Enchères
                  </CardTitle>
                  <CardDescription>
                    Suivez toutes vos enchères actives et passées
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <UserBids />
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Enchères Gagnées</CardTitle>
                    <CardDescription>Enchères que vous avez remportées</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/my-bids?filter=won">
                      <Button variant="outline" className="w-full">Voir les enchères gagnées</Button>
                    </Link>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Enchères Actives</CardTitle>
                    <CardDescription>Enchères sur lesquelles vous êtes en tête</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/my-bids?filter=winning">
                      <Button variant="outline" className="w-full">Voir les enchères actives</Button>
                    </Link>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Enchères Dépassées</CardTitle>
                    <CardDescription>Enchères où vous avez été dépassé</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/my-bids?filter=outbid">
                      <Button variant="outline" className="w-full">Voir les enchères dépassées</Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="watching" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Mes Favoris
                  </CardTitle>
                  <CardDescription>
                    Enchères que vous suivez
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <UserWatchlist />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Separator />

          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Vous cherchez de nouvelles enchères à suivre ?
            </p>
            <Link href="/auctions">
              <Button>Parcourir les Enchères</Button>
            </Link>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
} 