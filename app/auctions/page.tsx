import { Filter, SlidersHorizontal, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import AuctionGrid from "@/components/auction-grid"
import Header from "@/components/header"
export default function AuctionsPage() {
  return (
    <>
    <Header />
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Toutes les Enchères</h1>
            <p className="text-muted-foreground">Parcourez toutes les enchères actives dans toutes les catégories</p>
          </div>
          <div className="flex items-center gap-2">
            <form className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Rechercher des enchères..." className="w-full pl-8 md:w-[300px]" />
            </form>
            <Button variant="outline" size="icon" className="md:hidden">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filtrer</span>
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
          <div className="hidden md:block">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Filtres</h2>
                <Button variant="ghost" size="sm" className="h-auto p-0 text-sm">
                  Réinitialiser
                </Button>
              </div>

              <Accordion type="multiple" defaultValue={["category", "price", "condition"]}>
                <AccordionItem value="category">
                  <AccordionTrigger>Catégorie</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="category-watches" />
                        <Label htmlFor="category-watches" className="text-sm font-normal">
                          Montres & Bijoux
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="category-art" />
                        <Label htmlFor="category-art" className="text-sm font-normal">
                          Art & Collections
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="category-vehicles" />
                        <Label htmlFor="category-vehicles" className="text-sm font-normal">
                          Véhicules
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="category-books" />
                        <Label htmlFor="category-books" className="text-sm font-normal">
                          Livres & Manuscrits
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="category-electronics" />
                        <Label htmlFor="category-electronics" className="text-sm font-normal">
                          Électronique
                        </Label>
                      </div>
                      <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                        Voir plus
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="price">
                  <AccordionTrigger>Fourchette de Prix</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <Label htmlFor="min-price" className="text-xs">
                            Min
                          </Label>
                          <Input id="min-price" type="number" placeholder="0 €" />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="max-price" className="text-xs">
                            Max
                          </Label>
                          <Input id="max-price" type="number" placeholder="10000 €" />
                        </div>
                      </div>
                      <Button className="w-full">Appliquer</Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="condition">
                  <AccordionTrigger>État</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="condition-new" />
                        <Label htmlFor="condition-new" className="text-sm font-normal">
                          Neuf
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="condition-like-new" />
                        <Label htmlFor="condition-like-new" className="text-sm font-normal">
                          Comme Neuf
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="condition-excellent" />
                        <Label htmlFor="condition-excellent" className="text-sm font-normal">
                          Excellent
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="condition-good" />
                        <Label htmlFor="condition-good" className="text-sm font-normal">
                          Bon
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="condition-fair" />
                        <Label htmlFor="condition-fair" className="text-sm font-normal">
                          Correct
                        </Label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="time">
                  <AccordionTrigger>Temps Restant</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="time-ending-soon" />
                        <Label htmlFor="time-ending-soon" className="text-sm font-normal">
                          Se termine bientôt (24h)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="time-1-3-days" />
                        <Label htmlFor="time-1-3-days" className="text-sm font-normal">
                          1-3 jours
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="time-3-7-days" />
                        <Label htmlFor="time-3-7-days" className="text-sm font-normal">
                          3-7 jours
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="time-7-plus-days" />
                        <Label htmlFor="time-7-plus-days" className="text-sm font-normal">
                          7+ jours
                        </Label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2 justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="rounded-sm">
                  Enchères Actives
                </Badge>
                <Badge variant="outline" className="rounded-sm">
                  Montres & Bijoux
                </Badge>
                <Badge variant="outline" className="rounded-sm">
                  100 € - 1000 €
                </Badge>
                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                  Tout Effacer
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
                    <SelectItem value="ending-soon">Se termine bientôt</SelectItem>
                    <SelectItem value="newly-listed">Récemment ajouté</SelectItem>
                    <SelectItem value="price-low">Prix: Croissant</SelectItem>
                    <SelectItem value="price-high">Prix: Décroissant</SelectItem>
                    <SelectItem value="bids-high">Plus d'enchères</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <AuctionGrid />

            <div className="flex items-center justify-center">
              <div className="flex flex-wrap items-center space-x-2">
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
                  12
                </Button>
                <Button variant="outline" size="sm">
                  Suivant
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

