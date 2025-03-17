"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Package, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import UserListings from "@/components/user-listings"
import { useUser } from "@/contexts/UserContext"

export default function MyListingsPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useUser()
  const [activeTab, setActiveTab] = useState("active")

  if (!isAuthenticated) {
    return (
      <div className="container py-8 px-4 md:px-6">
        <div className="flex flex-col gap-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Accès restreint</h1>
            <p className="text-muted-foreground mb-6">
              Vous devez être connecté pour accéder à cette page
            </p>
            <Link href="/auth/login?callbackUrl=/my-listings">
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
            <h1 className="text-2xl font-bold">Mes ventes</h1>
          </div>
          <p className="text-muted-foreground">
            Gérez vos enchères actives et créez de nouvelles annonces
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Tabs 
            defaultValue="active" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full sm:w-auto"
          >
            <TabsList className="grid grid-cols-3 md:w-[400px]">
              <TabsTrigger value="active">Actives</TabsTrigger>
              <TabsTrigger value="ended">Terminées</TabsTrigger>
              <TabsTrigger value="draft">Brouillons</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Link href="/dashboard/create-auction">
            <Button className="w-full sm:w-auto flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Créer une enchère
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {activeTab === "active" 
                ? "Vos enchères actives" 
                : activeTab === "ended" 
                ? "Enchères terminées" 
                : "Brouillons"}
            </CardTitle>
            <CardDescription>
              {activeTab === "active" 
                ? "Enchères en cours que vous avez créées" 
                : activeTab === "ended"
                ? "Historique de vos enchères terminées"
                : "Enchères non publiées"}
            </CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="p-6">
            <UserListings />
          </CardContent>
        </Card>

        <div className="flex flex-col lg:flex-row gap-6">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Statistiques de vente</CardTitle>
              <CardDescription>
                Aperçu de vos performances de vente
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm font-medium mb-1">Enchères actives</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm font-medium mb-1">Enchères terminées</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm font-medium mb-1">Montant total</p>
                  <p className="text-2xl font-bold">0 €</p>
                </div>
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm font-medium mb-1">Taux de réussite</p>
                  <p className="text-2xl font-bold">0%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Ressources</CardTitle>
              <CardDescription>
                Guides utiles pour vendre avec succès
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="p-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Package className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Comment créer une enchère attractive</p>
                    <p className="text-sm text-muted-foreground">Conseils pour optimiser vos annonces</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Package className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Prendre de bonnes photos</p>
                    <p className="text-sm text-muted-foreground">Techniques pour mettre en valeur vos articles</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Package className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Fixer le bon prix de départ</p>
                    <p className="text-sm text-muted-foreground">Stratégies de tarification pour maximiser les enchères</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 