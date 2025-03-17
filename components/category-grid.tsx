"use client"

import { useEffect, useState } from 'react'
import Link from "next/link"
import Image from "next/image"
import { ShoppingBag } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { getCategories, Category } from "@/services/categoryService"
import { getSafeImageUrl } from "@/lib/imageUtils"
import LoadingSpinner from "@/components/loading-spinner"
import ErrorDisplay from "@/components/error-display"

// Placeholder category images for consistent display
const categoryImages = [
  "/category-art.jpg",
  "/category-electronics.jpg",
  "/category-fashion.jpg",
  "/category-collectibles.jpg",
  "/category-jewelry.jpg",
  "/category-home.jpg",
  "/category-sports.jpg",
  "/category-toys.jpg",
  "/category-books.jpg",
  "/category-music.jpg",
]

export default function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const data = await getCategories()
        setCategories(data)
      } catch (err) {
        console.error("Failed to fetch categories:", err)
        setError(err instanceof Error ? err.message : "Failed to load categories")
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return <LoadingSpinner text="Chargement des catégories..." />
  }

  if (error) {
    return <ErrorDisplay message={error} onRetry={() => window.location.reload()} />
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-12 bg-muted rounded-lg">
        <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
        <h3 className="mt-4 text-lg font-medium">Aucune catégorie disponible</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Veuillez réessayer ultérieurement.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {categories.map((category, index) => (
        <Link 
          key={category._id} 
          href={`/categories/${category._id}`} 
          className="transition-transform hover:scale-105"
        >
          <Card className="overflow-hidden border-0 shadow-md h-full">
            <div className="aspect-square relative">
              <Image
                src={category.image ? getSafeImageUrl(category.image) : categoryImages[index % categoryImages.length] || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
                <div className="p-4 text-white">
                  <h3 className="font-bold text-lg">{category.name}</h3>
                  {category.count && (
                    <p className="text-xs opacity-80">{category.count} articles</p>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}