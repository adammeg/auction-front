import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Clock, Search, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import FeaturedAuctions from "@/components/featured-auctions"
import CategoryGrid from "@/components/category-grid"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import Footer from "@/components/footer"
export default function HomePage() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                <div className="space-y-4">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Découvrez des Articles Uniques sur EL BATA
                  </h1>
                  <p className="text-muted-foreground md:text-xl">
                    Rejoignez des milliers de collectionneurs et d'amateurs sur notre plateforme d'enchères en ligne de
                    confiance. Trouvez des articles rares et de bonnes affaires dans de nombreuses catégories.
                  </p>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Link href="/auctions">
                      <Button size="lg" className="w-full sm:w-auto">
                        Parcourir les Enchères
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="/auth/signup">
                      <Button size="lg" variant="outline" className="w-full sm:w-auto">
                        Commencer à Vendre
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="relative aspect-video overflow-hidden rounded-xl">
                  <Image
                    src="/OIP.jpeg"
                    alt="Articles d'enchères en vedette"
                    width={1280}
                    height={720}
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="w-full py-12 md:py-24">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Enchères en Vedette</h2>
                  <p className="max-w-[700px] text-muted-foreground md:text-xl">
                    Découvrez nos enchères les plus populaires qui se terminent bientôt
                  </p>
                </div>
              </div>
              <FeaturedAuctions />
              <div className="flex justify-center mt-8">
                <Link href="/auctions">
                  <Button variant="outline" size="lg">
                    Voir Toutes les Enchères
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          <section className="w-full py-12 md:py-24 bg-muted">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Parcourir par Catégorie</h2>
                  <p className="max-w-[700px] text-muted-foreground md:text-xl">
                    Trouvez exactement ce que vous cherchez dans nos catégories organisées
                  </p>
                </div>
              </div>
              <CategoryGrid />
            </div>
          </section>

          <section className="w-full py-12 md:py-24">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                    Vendez vos Articles en Toute Confiance
                  </h2>
                  <p className="text-muted-foreground md:text-xl">
                    Atteignez des milliers d'acheteurs potentiels et obtenez le meilleur prix pour vos articles. Notre
                    plateforme sécurisée rend la vente facile et rentable.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span>Processus d'annonce simple</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span>Traitement sécurisé des paiements</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span>Support dédié aux vendeurs</span>
                    </li>
                  </ul>
                  <Link href="/auth/signup">
                    <Button size="lg">Commencez à Vendre Aujourd'hui</Button>
                  </Link>
                </div>
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <Image
                    src="/2f5bea87-1b6f-41e5-b648-4b6c45ae4afe.png"
                    alt="Vendre sur EnchèrePro"
                    width={800}
                    height={800}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}

