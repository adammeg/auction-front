"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Watch, Paintbrush, Car, BookOpen, Tv, Wine, Shirt, Gem } from "lucide-react"
import { Card } from "@/components/ui/card"
import { getCategories, Category } from "@/services/categoryService"
import { useToast } from "@/components/ui/use-toast"

// Map of category icons by name (case insensitive)
const categoryIcons: Record<string, any> = {
  "montres": Watch,
  "bijoux": Watch,
  "art": Paintbrush,
  "collections": Paintbrush,
  "véhicules": Car,
  "voitures": Car,
  "livres": BookOpen,
  "manuscrits": BookOpen,
  "électronique": Tv,
  "vins": Wine,
  "spiritueux": Wine,
  "mode": Shirt,
  "vêtements": Shirt,
  "luxe": Gem,
}

// Function to get icon for a category
const getCategoryIcon = (categoryName: string) => {
  const name = categoryName.toLowerCase();
  
  for (const [key, icon] of Object.entries(categoryIcons)) {
    if (name.includes(key)) {
      return icon;
    }
  }
  
  return Gem; // Default icon
}

export default function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true)
        const response = await getCategories()
        // The response from getCategories() is already a Category[] array
        // No need to check for a data property
        setCategories(response)
        setLoading(false)
      } catch (error) {
        console.error("Failed to load categories:", error)
        setCategories([])
        toast({
          title: "Erreur",
            description: "Format de données incorrect pour les catégories.",
            variant: "destructive",
          })
        setLoading(false)
      } finally {
        setLoading(false)
      }
    }

    loadCategories()
  }, [toast])

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 mt-8">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Card key={i} className="overflow-hidden h-full">
            <div className="aspect-square bg-muted animate-pulse" />
          </Card>
        ))}
      </div>
    )
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Aucune catégorie disponible pour le moment.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 mt-8">
      {categories.map((category) => {
        const Icon = getCategoryIcon(category.name);
        return (
          <Link key={category._id} href={`/categories/${category._id}`}>
            <Card className="overflow-hidden transition-all hover:shadow-md h-full">
              <div className="aspect-square relative">
                <Image 
                  src="/placeholder.svg?height=300&width=300" 
                  alt={category.name} 
                  fill 
                  className="object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-3 md:p-4">
                  <div className="flex items-center gap-1 md:gap-2 text-white">
                    <Icon className="h-4 w-4 md:h-5 md:w-5" />
                    <h3 className="text-sm md:text-base font-medium">{category.name}</h3>
                  </div>
                  <p className="text-xs md:text-sm text-white/80">
                    {category.count || 0} articles
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  )
}

