"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Package, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import UserListings from "@/components/user-listings"
import ProtectedRoute from "@/components/protected-route"
import { Separator } from "@/components/ui/separator"

export default function MyListingsPage() {
  const router = useRouter()

  return (
    <ProtectedRoute>
      <div className="container py-8 px-4 md:px-6">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">Mes Annonces</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Vos Annonces
              </CardTitle>
              <CardDescription>
                Gérez vos annonces d'enchères actives et passées
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UserListings />
            </CardContent>
          </Card>

          <Separator />

          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Vous avez un article à vendre ?
            </p>
            <Link href="/dashboard/create-auction">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Créer une Nouvelle Annonce
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
} 