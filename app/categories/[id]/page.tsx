import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Filter, SlidersHorizontal, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import AuctionGrid from "@/components/auction-grid"

// Données fictives pour les catégories
const categories = {
  watches: {
    id: "watches",
    name: "Montres & Bijoux",
    description:
      "Découvrez des pièces horlogères rares, des bijoux fins et des accessoires de collection de marques prestigieuses et d'artisans indépendants.",
    image: "/placeholder.svg?height=600&width=1200",
    count: 245,
  },
  art: {
    id: "art",
    name: "Art & Collections",
    description:
      "Explorez des peintures, sculptures, estampes et autres œuvres d'art à collectionner d'artistes émergents et établis.",
    image: "/placeholder.svg?height=600&width=1200",
    count: 189,
  },
  vehicles: {
    id: "vehicles",
    name: "Véhicules",
    description:
      "Parcourez les voitures classiques, motos, bateaux et autres véhicules de collectionneurs et passionnés du monde entier.",
    image: "/placeholder.svg?height=600&width=1200",
    count: 112,
  },
  books: {
    id: "books",
    name: "Livres & Manuscrits",
    description:
      "Trouvez des livres rares, premières éditions, exemplaires signés et manuscrits historiques de collections privées et de marchands.",
    image: "/placeholder.svg?height=600&width=1200",
    count: 156,
  },
}

export default function CategoryPage({ params }: { params: { id: string } }) {
  // Dans une vraie application, nous récupérerions les données de catégorie depuis une API
  const category = categories[params.id as keyof typeof categories] || {
    id: params.id,
    name: params.id.charAt(0).toUpperCase() + params.id.slice(1),
    description: "Parcourez tous les articles de cette catégorie",
    image: "/placeholder.svg?height=600&width=1200",
    count: 100,
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="space-y-6">
        <div className="mb-6">
          <Link href="/categories" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux Catégories
          </Link>
        </div>

        <div className="relative aspect-[3/1] overflow-hidden rounded-lg">
          <Image
            src={category.image || "/placeholder.svg"}
            alt={category.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
            <div className="max-w-3xl">
              <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
                {category.name}
              </h1>
              <p className="mt-2 text-white/90 md:text-xl">{category.description}</p>
              <Badge className="mt-4 text-sm" variant="secondary">
                {category.count} articles
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">Parcourir {category.name}</h2>
            <p className="text-muted-foreground">{category.count} enchères actives dans cette catégorie</p>
          </div>
          <div className="flex items-center gap-2">
            <form className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={`Rechercher dans ${category.name}...`}
                className="w-full pl-8 md:w-[300px]"
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
            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
              Effacer Tout
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1 hidden md:flex">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>Trier</span>
            </Button>
            <Select defaultValue="ending-soon">
              <SelectTrigger className="h-8 w-[160px]">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ending-soon">Se Termine Bientôt</SelectItem>
                <SelectItem value="newly-listed">Récemment Listés</SelectItem>
                <SelectItem value="price-low">Prix: Croissant</SelectItem>
                <SelectItem value="price-high">Prix: Décroissant</SelectItem>
                <SelectItem value="bids-high">Plus d'Enchères</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <AuctionGrid />

        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Précédent
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              1
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              2
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              3
            </Button>
            <span>...</span>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              8
            </Button>
            <Button variant="outline" size="sm">
              Suivant
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

