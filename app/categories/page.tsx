"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import CategoryGrid from "@/components/category-grid"
import { getCategories, getFeaturedCategories, Category } from "@/services/categoryService"
import LoadingSpinner from "@/components/loading-spinner"
import ErrorDisplay from "@/components/error-display"
import { getSafeImageUrl } from "@/lib/imageUtils"

export default function CategoriesPage() {
  const [featuredCategories, setFeaturedCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchFeaturedCategories = async () => {
      try {
        setLoading(true)
        const data = await getFeaturedCategories(4)
        setFeaturedCategories(data)
      } catch (err) {
        console.error("Failed to fetch featured categories:", err)
        setError(err instanceof Error ? err.message : "Failed to load featured categories")
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedCategories()
  }, [])

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Catégories</h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Parcourez notre large sélection de catégories d'enchères pour trouver exactement ce que vous cherchez.
            </p>
          </div>
          
          <div className="w-full md:w-auto">
            <Input
              type="search"
              placeholder="Rechercher une catégorie..."
              className="w-full md:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Toutes les catégories</h2>
          <p className="text-muted-foreground">
            Explorez notre collection complète de catégories d'enchères
          </p>
        </div>

        <CategoryGrid />

        {loading ? (
          <LoadingSpinner text="Chargement des catégories en vedette..." />
        ) : error ? (
          <ErrorDisplay message={error} />
        ) : featuredCategories.length > 0 && (
          <section className="mt-12 space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Catégories en Vedette</h2>
              <p className="text-muted-foreground">
                Découvrez nos catégories les plus populaires avec les enchères les plus prisées du moment.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {featuredCategories.slice(0, 2).map((category) => (
                <div key={category._id} className="group relative overflow-hidden rounded-lg">
                  <Image
                    src={category.image ? getSafeImageUrl(category.image) : "/placeholder.svg"}
                    alt={category.name}
                    width={800}
                    height={400}
                    className="aspect-[2/1] object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                    <p className="mb-4 text-white/80">
                      {category.description || `Découvrez notre collection de ${category.name}`}
                    </p>
                    <Link href={`/categories/${category._id}`}>
                      <Button variant="secondary" className="w-full sm:w-auto">
                        Explorer la Collection
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mt-12 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Parcourir par thèmes</h2>
            <p className="text-muted-foreground">
              Découvrez des collections spécialement sélectionnées
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCategories.slice(0, 3).map((category) => (
              <Link key={category._id} href={`/categories/${category._id}`} className="group block space-y-2">
                <div className="overflow-hidden rounded-lg">
                  <Image
                    src={category.image ? getSafeImageUrl(category.image) : "/placeholder.svg"}
                    alt={category.name}
                    width={500}
                    height={300}
                    className="aspect-[5/3] object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <h3 className="font-bold">{category.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {category.description || `Explorez notre collection de ${category.name.toLowerCase()}`}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

