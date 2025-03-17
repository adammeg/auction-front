"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Filter, Grid3X3, List, Package } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import AuctionGrid from "@/components/auction-grid"
import { getCategoryById, getAuctionsByCategory } from "@/services/categoryService"
import LoadingSpinner from "@/components/loading-spinner"
import ErrorDisplay from "@/components/error-display"
import { getSafeImageUrl } from "@/lib/imageUtils"
import { Auction } from "@/types/auction"

export default function CategoryDetailPage() {
  const params = useParams()
  const router = useRouter()
  const categoryId = params?.id as string
  
  const [category, setCategory] = useState<any>(null)
  const [auctions, setAuctions] = useState<Auction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState("newest")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  
  useEffect(() => {
    const fetchCategoryData = async () => {
      if (!categoryId) return
      
      try {
        setLoading(true)
        setError(null)
        
        // Fetch category details
        const categoryData = await getCategoryById(categoryId)
        if (!categoryData) {
          throw new Error("Catégorie introuvable")
        }
        setCategory(categoryData)
        
        // Fetch auctions in this category
        const auctionsData = await getAuctionsByCategory(categoryId)
        setAuctions(auctionsData)
        
      } catch (err) {
        console.error("Error fetching category data:", err)
        setError(err instanceof Error ? err.message : "Impossible de charger les informations de la catégorie")
      } finally {
        setLoading(false)
      }
    }
    
    if (categoryId) {
      fetchCategoryData()
    }
  }, [categoryId])
  
  const filteredAuctions = auctions
    .filter(auction => 
      searchQuery === "" || 
      auction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      auction.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortOrder === "ending-soon") {
        const aEndDate = new Date(a.endDate || a.endTime || "");
        const bEndDate = new Date(b.endDate || b.endTime || "");
        return aEndDate.getTime() - bEndDate.getTime();
      } else if (sortOrder === "price-low") {
        return (a.currentBid || a.startingBid) - (b.currentBid || b.startingBid);
      } else if (sortOrder === "price-high") {
        return (b.currentBid || b.startingBid) - (a.currentBid || a.startingBid);
      }
      return 0;
    });
  
  if (loading) {
    return (
      <div className="container py-12 px-4 md:px-6">
        <LoadingSpinner text="Chargement de la catégorie..." />
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="container py-12 px-4 md:px-6">
        <ErrorDisplay 
          message={error} 
          onRetry={() => window.location.reload()}
        />
      </div>
    )
  }
  
  if (!category) {
    return (
      <div className="container py-12 px-4 md:px-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Catégorie introuvable</h2>
          <p className="text-muted-foreground mb-6">La catégorie que vous recherchez n'existe pas ou a été supprimée.</p>
          <Button onClick={() => router.back()}>Retour</Button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="flex flex-col gap-8">
        {/* Back button */}
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-full"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Retour</span>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{category.name}</h1>
            <p className="text-muted-foreground">
              {category.description || `Explorez notre collection de ${category.name.toLowerCase()}`}
            </p>
          </div>
        </div>
        
        {/* Category banner */}
        {category.image && (
          <div className="relative w-full h-40 sm:h-60 md:h-80 rounded-lg overflow-hidden">
            <Image
              src={getSafeImageUrl(category.image)}
              alt={category.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent flex items-center">
              <div className="p-8">
                <h2 className="text-3xl font-bold">{category.name}</h2>
                <p className="text-muted-foreground max-w-md mt-2">
                  {category.description || `Découvrez nos ${category.name.toLowerCase()} exceptionnels`}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Search and filters */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Rechercher dans cette catégorie..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="flex gap-2">
              <Select
                value={sortOrder}
                onValueChange={setSortOrder}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Plus récent</SelectItem>
                  <SelectItem value="ending-soon">Se termine bientôt</SelectItem>
                  <SelectItem value="price-low">Prix croissant</SelectItem>
                  <SelectItem value="price-high">Prix décroissant</SelectItem>
                </SelectContent>
              </Select>
              
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
          
          <div className="text-sm text-muted-foreground">
            {filteredAuctions.length} article{filteredAuctions.length !== 1 && 's'} dans cette catégorie
          </div>
        </div>
        
        {/* Auction grid */}
        {filteredAuctions.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Aucune enchère disponible</h3>
              <p className="text-muted-foreground text-center max-w-md mb-6">
                Il n'y a actuellement aucune enchère active dans cette catégorie. Veuillez revenir ultérieurement ou explorer d'autres catégories.
              </p>
              <Link href="/categories">
                <Button>Explorer d'autres catégories</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <AuctionGrid 
            auctions={filteredAuctions} 
            viewMode={viewMode} 
            emptyMessage={`Aucune enchère ne correspond à votre recherche dans ${category.name}`}
          />
        )}
      </div>
    </div>
  )
}

