"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Search, Filter, SlidersHorizontal, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import AuctionGrid from "@/components/auction-grid"
import { searchAuctions } from "@/services/auctionService"
import { Auction } from "@/types/auction"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get("q") || ""
  const sort = searchParams.get("sort") || "relevance"
  const category = searchParams.get("category") || ""
  const page = parseInt(searchParams.get("page") || "1", 10)
  
  const [searchQuery, setSearchQuery] = useState(query)
  const [auctions, setAuctions] = useState<Auction[]>([])
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true)
        const response = await searchAuctions({
          query,
          sort,
          category,
          page,
          limit: 12
        })
        
        setAuctions(response.data || [])
        setTotalPages(response.pagination?.totalPages || 1)
        setTotalResults(response.pagination?.total || 0)
      } catch (error) {
        console.error("Error fetching search results:", error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchSearchResults()
  }, [query, sort, category, page])

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Update URL with search parameters
    const params = new URLSearchParams()
    if (searchQuery) params.set("q", searchQuery)
    if (sort !== "relevance") params.set("sort", sort)
    if (category) params.set("category", category)
    
    router.push(`/search?${params.toString()}`)
  }

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("sort", value)
    router.push(`/search?${params.toString()}`)
  }

  const handleClearFilters = () => {
    router.push("/search")
    setSearchQuery("")
  }

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", newPage.toString())
    router.push(`/search?${params.toString()}`)
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Résultats de Recherche</h1>
            {query && (
              <p className="text-muted-foreground">
                {totalResults} résultats pour "{query}"
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <form className="relative w-full md:w-auto" onSubmit={handleSearch}>
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher des enchères..."
                className="w-full pl-8 md:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                name="q"
              />
            </form>
            <Button variant="outline" size="icon" className="md:hidden">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filtrer</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="rounded-sm">
              Enchères Actives
            </Badge>
            {query && (
              <Badge variant="outline" className="rounded-sm">
                "{query}"
              </Badge>
            )}
            {(query || sort !== "relevance" || category) && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 px-2 text-xs"
                onClick={handleClearFilters}
              >
                Effacer Tout
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1 hidden md:flex">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>Trier</span>
            </Button>
            <Select value={sort} onValueChange={handleSortChange}>
              <SelectTrigger className="h-8 w-[160px]">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Pertinence</SelectItem>
                <SelectItem value="ending-soon">Se Termine Bientôt</SelectItem>
                <SelectItem value="newly-listed">Récemment Listés</SelectItem>
                <SelectItem value="price-low">Prix: Croissant</SelectItem>
                <SelectItem value="price-high">Prix: Décroissant</SelectItem>
                <SelectItem value="bids-high">Plus d'Enchères</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : auctions.length > 0 ? (
          <AuctionGrid auctions={auctions} />
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aucun résultat trouvé pour votre recherche.</p>
            <p className="text-sm mt-2">Essayez d'autres termes ou parcourez toutes les enchères.</p>
            <Button className="mt-4" onClick={() => router.push("/auctions")}>
              Voir Toutes les Enchères
            </Button>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                disabled={page <= 1}
                onClick={() => handlePageChange(page - 1)}
              >
                Précédent
              </Button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Show pages around the current page
                let pageNum = page;
                if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }
                
                if (pageNum > 0 && pageNum <= totalPages) {
                  return (
                    <Button 
                      key={pageNum}
                      variant={pageNum === page ? "default" : "outline"} 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                }
                return null;
              })}
              
              {totalPages > 5 && page < totalPages - 2 && (
                <>
                  <span>...</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 w-8 p-0"
                    onClick={() => handlePageChange(totalPages)}
                  >
                    {totalPages}
                  </Button>
                </>
              )}
              
              <Button 
                variant="outline" 
                size="sm"
                disabled={page >= totalPages}
                onClick={() => handlePageChange(page + 1)}
              >
                Suivant
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

