"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { createAuction } from "@/services/auctionService"
import { getCategories } from "@/services/categoryService"
import ProtectedRoute from "@/components/protected-route"

export default function CreateAuctionPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [images, setImages] = useState<File[]>([])
  const [imagePreview, setImagePreview] = useState<string[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    condition: '',
    startingBid: '',
    reservePrice: '',
    auctionDuration: '7',
    minBid: '1',
    shippingOptions: {
      domestic: false,
      international: false,
      local: false
    },
    paymentMethods: {
      card: true,
      paypal: true,
      bank: false
    },
  })

  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories()
        setCategories(response)
      } catch (error) {
        console.error('Failed to load categories:', error)
        toast({
          title: "Erreur",
          description: "Impossible de charger les catégories",
          variant: "destructive",
        })
      }
    }

    fetchCategories()
  }, [toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCheckboxChange = (group: string, name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [group]: {
        ...prev[group as keyof typeof prev] as Record<string, boolean>,
        [name]: checked
      }
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)

      // Limit to 5 images total
      const totalFiles = [...images, ...newFiles].slice(0, 5)
      setImages(totalFiles)

      // Create preview URLs
      const newPreviews = totalFiles.map(file => URL.createObjectURL(file))
      setImagePreview(newPreviews)
    }
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)

    // Update previews
    const newPreviews = [...imagePreview]
    URL.revokeObjectURL(newPreviews[index]) // Clean up the URL
    newPreviews.splice(index, 1)
    setImagePreview(newPreviews)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Create FormData object for file upload
      const auctionFormData = new FormData()

      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (typeof value === 'object') {
          auctionFormData.append(key, JSON.stringify(value))
        } else {
          auctionFormData.append(key, value)
        }
      })

      // Add images
      images.forEach(image => {
        auctionFormData.append('images', image)
      })

      // Send to API
      const response = await createAuction(auctionFormData)

      toast({
        title: "Enchère créée avec succès",
        description: "Votre article a été mis en vente.",
      })

      router.push(`/auctions/${response._id}`)
    } catch (error) {
      console.error('Error creating auction:', error)
      toast({
        title: "Erreur lors de la création de l'enchère",
        description: "Un problème est survenu. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <ProtectedRoute>
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="mb-6">
          <Link href="/dashboard" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au Tableau de Bord
          </Link>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">Créer une Nouvelle Enchère</h1>
            <p className="text-muted-foreground">Mettez votre article aux enchères et définissez vos conditions</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Détails de l'Article</CardTitle>
                <CardDescription>Fournissez des informations détaillées sur l'article que vous vendez</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-3">
                  <Label htmlFor="title">Titre</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="ex: Montre Mécanique Vintage"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Soyez précis et incluez des détails clés que les acheteurs pourraient rechercher
                  </p>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="category">Catégorie</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleSelectChange('category', value)}
                    required
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Sélectionnez une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Décrivez votre article en détail, y compris son état, son histoire et ses caractéristiques uniques..."
                    className="min-h-[150px]"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Soyez complet et honnête sur l'état de l'article et ses éventuels défauts
                  </p>
                </div>

                <div className="grid gap-3">
                  <Label>État de l'Article</Label>
                  <Select
                    value={formData.condition}
                    onValueChange={(value) => handleSelectChange('condition', value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez l'état" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">Neuf</SelectItem>
                      <SelectItem value="like-new">Comme Neuf</SelectItem>
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="good">Bon</SelectItem>
                      <SelectItem value="fair">Correct</SelectItem>
                      <SelectItem value="poor">Mauvais</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-3">
                  <Label>Photos</Label>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                    {imagePreview.map((src, index) => (
                      <div key={index} className="relative aspect-square overflow-hidden rounded-md">
                        <img
                          src={src}
                          alt={`Preview ${index + 1}`}
                          className="h-full w-full rounded-md object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute right-1 top-1 h-6 w-6"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Supprimer l'image</span>
                        </Button>
                      </div>
                    ))}
                    {imagePreview.length < 5 && (
                      <label className="flex aspect-square cursor-pointer items-center justify-center rounded-md border border-dashed text-muted-foreground hover:bg-muted/50">
                        <div className="flex flex-col items-center gap-1">
                          <Upload className="h-8 w-8" />
                          <span className="text-xs">Ajouter Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                            multiple
                          />
                        </div>
                      </label>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Téléchargez jusqu'à 5 photos de haute qualité de votre article sous différents angles
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Paramètres d'Enchère</CardTitle>
                <CardDescription>Définissez vos paramètres d'enchère et de prix</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-3">
                  <Label htmlFor="startingBid">Prix de Départ (DT)</Label>
                  <Input
                    id="startingBid"
                    name="startingBid"
                    value={formData.startingBid}
                    onChange={handleChange}
                    type="number"
                    min="1"
                    step="0.01"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Le prix minimum auquel les enchères commenceront
                  </p>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="reservePrice">Prix de Réserve (DT) (Optionnel)</Label>
                  <Input
                    id="reservePrice"
                    name="reservePrice"
                    value={formData.reservePrice}
                    onChange={handleChange}
                    type="number"
                    min="0"
                    step="0.01"
                  />
                  <p className="text-xs text-muted-foreground">
                    Prix minimum que vous êtes prêt à accepter. Laissez vide s'il n'y a pas de prix de réserve.
                  </p>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="auctionDuration">Durée de l'enchère (jours)</Label>
                  <Select 
                    value={formData.auctionDuration || "7"} 
                    onValueChange={(value) => handleSelectChange('auctionDuration', value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez la durée" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 jour</SelectItem>
                      <SelectItem value="3">3 jours</SelectItem>
                      <SelectItem value="5">5 jours</SelectItem>
                      <SelectItem value="7">7 jours</SelectItem>
                      <SelectItem value="10">10 jours</SelectItem>
                      <SelectItem value="14">14 jours</SelectItem>
                      <SelectItem value="30">30 jours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="minBid">Incrément minimal d'enchère (DT)</Label>
                  <Input
                    id="minBid"
                    name="minBid"
                    type="number"
                    min="1"
                    placeholder="Ex: 5"
                    value={formData.minBid || 1}
                    onChange={handleChange}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Montant minimum qu'un enchérisseur doit ajouter par rapport à l'enchère précédente
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" required />
              <Label htmlFor="terms" className="text-sm font-normal">
                J'accepte les{" "}
                <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
                  Conditions d'Utilisation
                </Link>{" "}
                et la{" "}
                <Link href="/seller-policy" className="underline underline-offset-4 hover:text-primary">
                  Politique des Vendeurs
                </Link>
              </Label>
            </div>

            <div className="flex gap-4">
              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Création en cours..." : "Créer l'Enchère"}
              </Button>
              <Button type="button" variant="outline" size="lg">
                Enregistrer comme Brouillon
              </Button>
            </div>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  )
}

