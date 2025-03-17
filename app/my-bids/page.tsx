"use client"

import { useState } from "react"
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
import { useUser } from "@/contexts/UserContext"

export default function MyBidsPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useUser()
  const [activeTab, setActiveTab] = useState("active-bids")

  if (!isAuthenticated) {
    return (
      <div className="container py-8 px-4 md:px-6">
        <div className="flex flex-col gap-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Accès restreint</h1>
            <p className="text-muted-foreground mb-6">
              Vous devez être connecté pour accéder à cette page
            </p>
            <Link href="/auth/login?callbackUrl=/my-bids">
              <Button>Se connecter</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full" 
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Retour</span>
            </Button>
            <h1 className="text-2xl font-bold">Mes enchères</h1>
          </div>
          <p className="text-muted-foreground">
            Gérez toutes vos enchères et articles suivis
          </p>
        </div>

        <Tabs 
          defaultValue="active-bids" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid grid-cols-2 md:w-[400px]">
            <TabsTrigger value="active-bids" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Enchères actives
            </TabsTrigger>
            <TabsTrigger value="watchlist" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Articles suivis
            </TabsTrigger>
          </TabsList>
          
          <Card>
            <CardHeader>
              <CardTitle>
                {activeTab === "active-bids" ? "Vos enchères actives" : "Articles suivis"}
              </CardTitle>
              <CardDescription>
                {activeTab === "active-bids" 
                  ? "Voici les enchères sur lesquelles vous avez misé" 
                  : "Les articles que vous suivez actuellement"}
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="p-6">
              <TabsContent value="active-bids" className="mt-0">
                <UserBids />
              </TabsContent>
              <TabsContent value="watchlist" className="mt-0">
                <UserWatchlist />
              </TabsContent>
            </CardContent>
          </Card>

          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Vous cherchez de nouvelles enchères à suivre ?
            </p>
            <Link href="/auctions">
              <Button>Parcourir les Enchères</Button>
            </Link>
          </div>
        </Tabs>
      </div>
    </div>
  )
} 