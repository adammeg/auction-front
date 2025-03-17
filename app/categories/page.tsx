import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import CategoryGrid from "@/components/category-grid"

export default function CategoriesPage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Catégories</h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Parcourez notre large sélection de catégories d'enchères pour trouver exactement ce que vous cherchez.
          </p>
        </div>

        <CategoryGrid />

        <section className="mt-12 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Catégories en Vedette</h2>
            <p className="text-muted-foreground">
              Découvrez nos catégories les plus populaires avec les enchères les plus prisées du moment.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="group relative overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=400&width=800"
                alt="Montres de Luxe"
                width={800}
                height={400}
                className="aspect-[2/1] object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white">Montres de Luxe</h3>
                <p className="mb-4 text-white/80">
                  Découvrez des pièces rares et de collection de marques prestigieuses.
                </p>
                <Link href="/categories/watches">
                  <Button variant="secondary" className="w-full sm:w-auto">
                    Explorer la Collection
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=400&width=800"
                alt="Beaux-Arts"
                width={800}
                height={400}
                className="aspect-[2/1] object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white">Beaux-Arts</h3>
                <p className="mb-4 text-white/80">
                  Explorez des peintures, sculptures et estampes d'artistes émergents et établis.
                </p>
                <Link href="/categories/art">
                  <Button variant="secondary" className="w-full sm:w-auto">
                    Explorer la Collection
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Nouvelles Catégories</h2>
            <p className="text-muted-foreground">
              Explorez nos nouvelles catégories d'enchères avec des articles frais ajoutés quotidiennement.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/categories/crypto" className="group block space-y-2">
              <div className="overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Collections Crypto"
                  width={500}
                  height={300}
                  className="aspect-[5/3] object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="font-bold">Collections Crypto</h3>
              <p className="text-sm text-muted-foreground">
                Actifs numériques, NFT et objets de collection liés à la blockchain.
              </p>
            </Link>

            <Link href="/categories/vintage-tech" className="group block space-y-2">
              <div className="overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Technologie Vintage"
                  width={500}
                  height={300}
                  className="aspect-[5/3] object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="font-bold">Technologie Vintage</h3>
              <p className="text-sm text-muted-foreground">
                Ordinateurs rétro, consoles de jeu classiques et électronique ancienne.
              </p>
            </Link>

            <Link href="/categories/sports-memorabilia" className="group block space-y-2">
              <div className="overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Souvenirs Sportifs"
                  width={500}
                  height={300}
                  className="aspect-[5/3] object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="font-bold">Souvenirs Sportifs</h3>
              <p className="text-sm text-muted-foreground">
                Maillots signés, cartes à collectionner et équipements utilisés en match.
              </p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

