"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Filter, SlidersHorizontal, Grid3X3, List } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { getActiveAuctions, searchAuctions } from "@/services/auctionService"
import { getCategories } from "@/services/categoryService"
import AuctionGrid from "@/components/auction-grid"
import { useToast } from "@/components/ui/use-toast"
import { Auction } from "@/types/auction"
import { Category } from "@/services/categoryService"

export default function AuctionsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const [auctions, setAuctions] = useState<Auction[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "")
  const [sortOrder, setSortOrder] = useState("newest")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [minPrice, setMinPrice] = useState<string>("")
  const [maxPrice, setMaxPrice] = useState<string>("")
  const [page, setPage] = useState(1)
  const [limit] = useState(12)

  // Fetch auctions and categories on initial load
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Get categories
        const categoriesData = await getCategories()
        if (Array.isArray(categoriesData)) {
          setCategories(categoriesData)
        } else if (categoriesData && Array.isArray(categoriesData)) {
          setCategories(categoriesData)
        } else {
          console.warn("Unexpected categories response format:", categoriesData)
          setCategories([])
        }

        // Get auctions based on search params
        const initialQuery = searchParams.get("q")
        const initialCategory = searchParams.get("category")

        let auctionsData
        if (initialQuery || initialCategory) {
          // Use search with filters
          auctionsData = await searchAuctions({
            query: initialQuery || "",
            category: initialCategory || "",
            sort: "newest"
          })
        } else {
          // Get all active auctions
          auctionsData = await getActiveAuctions()
        }

        console.log("Auctions data:", auctionsData)

        // Check the structure of the response and handle appropriately
        if (auctionsData && auctionsData.data) {
          setAuctions(auctionsData.data)
          setTotal(auctionsData.total || auctionsData.data.length)
        } else if (Array.isArray(auctionsData)) {
          setAuctions(auctionsData)
          setTotal(auctionsData.length)
        } else {
          setAuctions([])
          setTotal(0)
          console.warn("Unexpected response format:", auctionsData)
        }
      } catch (err) {
        console.error("Error fetching data:", err)
        const errorMessage = err instanceof Error ? err.message : "Failed to load auctions"
        setError(errorMessage)
        toast({
          title: "Error",
          description: "Failed to load auctions. Please try again.",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [searchParams, toast])

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setLoading(true)
      setError(null)

      // Build search params
      const searchParams: any = {
        query: searchQuery,
        category: selectedCategory,
        sort: sortOrder,
        page,
        limit
      }

      // Add price range if set
      if (minPrice) searchParams.minPrice = parseFloat(minPrice)
      if (maxPrice) searchParams.maxPrice = parseFloat(maxPrice)

      const response = await searchAuctions(searchParams)

      // Check response format
      if (response && response.data) {
        setAuctions(response.data)
        setTotal(response.total || response.data.length)
      } else if (Array.isArray(response)) {
        setAuctions(response)
        setTotal(response.length)
      } else {
        setAuctions([])
        setTotal(0)
        console.warn("Unexpected search response format:", response)
      }

      // Update URL with search parameters for shareable links
      const url = new URL(window.location.href)
      if (searchQuery) url.searchParams.set('q', searchQuery)
      else url.searchParams.delete('q')
      
      if (selectedCategory) url.searchParams.set('category', selectedCategory)
      else url.searchParams.delete('category')
      
      window.history.pushState({}, '', url.toString())
      
    } catch (err) {
      console.error("Search error:", err)
      const errorMessage = err instanceof Error ? err.message : "Failed to perform search"
      setError(errorMessage)
      toast({
        title: "Search Error",
        description: errorMessage,
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Enchères en Cours</h1>
          <p className="text-muted-foreground mt-2">
            Parcourez et enchérissez sur des articles uniques et intéressants
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <form onSubmit={handleSearch} className="flex gap-2 flex-1">
            <Input
              type="search"
              placeholder="Rechercher des enchères..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
            <Button type="submit">Rechercher</Button>
          </form>

          <div className="flex items-center gap-2">
            <Select value={sortOrder} onValueChange={(value) => setSortOrder(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Plus récent</SelectItem>
                <SelectItem value="oldest">Plus ancien</SelectItem>
                <SelectItem value="price_asc">Prix croissant</SelectItem>
                <SelectItem value="price_desc">Prix décroissant</SelectItem>
                <SelectItem value="ending_soon">Bientôt terminé</SelectItem>
              </SelectContent>
            </Select>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filtres</SheetTitle>
                  <SheetDescription>
                    Filtrer les enchères par catégorie, prix, etc.
                  </SheetDescription>
                </SheetHeader>

                <form onSubmit={handleSearch} className="py-4 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Catégories</h3>
                    <Select
                      value={selectedCategory}
                      onValueChange={(value) => setSelectedCategory(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Toutes les catégories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Toutes les catégories</SelectItem>
                        {categories && categories.map((category) => (
                          <SelectItem key={category._id} value={category._id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Prix</h3>
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Min" 
                        type="number" 
                        min="0"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                      />
                      <Input 
                        placeholder="Max" 
                        type="number" 
                        min="0"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Appliquer les filtres
                  </Button>
                </form>
              </SheetContent>
            </Sheet>

            <div className="flex border rounded-md">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                className="rounded-none rounded-l-md"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Separator orientation="vertical" className="h-8" />
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                className="rounded-none rounded-r-md"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Chargement des enchères...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-destructive mb-2">Une erreur est survenue</p>
            <p className="text-muted-foreground">{error}</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Réessayer
            </Button>
          </div>
        ) : auctions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">Aucune enchère ne correspond à votre recherche</p>
            <Link href="/auctions">
              <Button variant="outline">Voir toutes les enchères</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="text-sm text-muted-foreground mb-4">
              {total} résultat{total !== 1 && 's'} trouvé{total !== 1 && 's'}
            </div>
            <AuctionGrid auctions={auctions} viewMode={viewMode} />
            
            {/* Add pagination here if needed */}
          </>
        )}
      </div>
    </div>
  )
}

