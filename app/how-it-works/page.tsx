import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Search, Gavel, CreditCard, Truck, Clock, ShieldCheck, HelpCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function HowItWorksPage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="space-y-12">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Comment Fonctionne EnchèrePro</h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Votre guide pour acheter et vendre sur notre plateforme d'enchères
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter">Découvrez des Articles Uniques</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                EnchèrePro connecte les collectionneurs, les passionnés et les vendeurs dans un marché en ligne de
                confiance. Que vous recherchiez des objets de collection rares, des montres vintage, des œuvres d'art
                Que vous recherchiez des objets de collection rares, des montres vintage, des œuvres d'art ou des
                souvenirs uniques, notre plateforme propose une sélection diversifiée d'articles authentifiés provenant
                de vendeurs du monde entier.
              </p>
              <p>
                Avec des milliers de nouvelles enchères démarrant chaque jour, vous trouverez toujours quelque chose de
                spécial qui correspond à vos intérêts et à votre passion.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/auctions">
                <Button size="lg">
                  Parcourir les Enchères
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="outline" size="lg">
                  Créer un Compte
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-xl">
            <Image
              src="/placeholder.svg?height=720&width=1280"
              alt="Articles d'enchères EnchèrePro"
              width={1280}
              height={720}
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter">Pour les Acheteurs</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground">
            Comment trouver et enchérir sur les articles que vous aimez
          </p>

          <div className="grid gap-8 md:grid-cols-3 mt-8">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">1. Trouvez des Articles</h3>
              <p className="text-muted-foreground">
                Parcourez les catégories, utilisez les filtres de recherche ou explorez les enchères en vedette pour
                découvrir des articles qui vous intéressent.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Gavel className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">2. Placez des Enchères</h3>
              <p className="text-muted-foreground">
                Entrez votre montant d'enchère maximum. Notre système enchérira automatiquement pour vous jusqu'à votre
                limite.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">3. Gagnez & Payez</h3>
              <p className="text-muted-foreground">
                Si vous êtes le plus offrant à la fin de l'enchère, vous recevrez une notification pour finaliser votre
                achat.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Link href="/auctions">
              <Button size="lg">
                Commencer à Enchérir
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter">Pour les Vendeurs</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground">Comment mettre en vente vos articles</p>

          <div className="grid gap-8 md:grid-cols-3 mt-8">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">1. Créer une Annonce</h3>
              <p className="text-muted-foreground">
                Ajoutez des descriptions détaillées, des photos de haute qualité et définissez votre prix de départ et
                la durée de l'enchère.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Gavel className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">2. Gérer l'Enchère</h3>
              <p className="text-muted-foreground">
                Suivez les enchères, répondez aux questions des acheteurs et surveillez la performance de votre enchère
                en temps réel.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">3. Expédier & Être Payé</h3>
              <p className="text-muted-foreground">
                Une fois que l'acheteur a payé, expédiez l'article en toute sécurité. Les fonds seront transférés sur
                votre compte après la livraison.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Link href="/dashboard/create-auction">
              <Button size="lg">
                Commencer à Vendre
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="order-2 md:order-1 relative aspect-video overflow-hidden rounded-xl">
            <Image
              src="/placeholder.svg?height=720&width=1280"
              alt="Enchères sécurisées EnchèrePro"
              width={1280}
              height={720}
              className="object-cover"
            />
          </div>
          <div className="order-1 md:order-2 space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter">Transactions Sûres & Sécurisées</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Chez EnchèrePro, nous accordons la priorité à la sécurité de chaque transaction. Notre plateforme
                comprend des protections intégrées pour les acheteurs et les vendeurs, notamment un traitement sécurisé
                des paiements, une vérification d'identité et un système complet de résolution des litiges.
              </p>
              <p>
                Nous conservons les paiements en garantie jusqu'à ce que les acheteurs confirment la réception de leurs
                articles, assurant ainsi une expérience fluide et fiable pour tous.
              </p>
            </div>
            <div className="space-y-2 pt-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span>Traitement sécurisé des paiements</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span>Protection acheteur et vendeur</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span>Système de résolution des litiges</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span>Services d'authentification pour les articles de grande valeur</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter">Foire Aux Questions</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground">Réponses rapides aux questions courantes</p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Combien coûte l'utilisation d'EnchèrePro ?</h3>
                  <p className="text-sm text-muted-foreground">
                    La création d'un compte et les enchères sont gratuites. Les vendeurs paient des frais d'annonce et
                    des frais de valeur finale lorsque les articles sont vendus. Consultez notre structure de frais pour
                    plus de détails.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Comment savoir si les articles sont authentiques ?</h3>
                  <p className="text-sm text-muted-foreground">
                    Les vendeurs doivent fournir des descriptions et photos détaillées. Les articles de grande valeur
                    sont souvent accompagnés de certificats d'authenticité. Nous offrons également une protection
                    acheteur.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Que faire si je ne reçois pas mon article ?</h3>
                  <p className="text-sm text-muted-foreground">
                    Nous conservons le paiement en garantie jusqu'à ce que vous confirmiez la réception. En cas de
                    problème, notre équipe de résolution des litiges vous aidera à le résoudre.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Puis-je annuler une enchère ?</h3>
                  <p className="text-sm text-muted-foreground">
                    En général, les enchères sont contraignantes. Cependant, dans des circonstances exceptionnelles,
                    notre équipe d'assistance peut vous aider avec les rétractations d'enchères.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Combien de temps durent les enchères ?</h3>
                  <p className="text-sm text-muted-foreground">
                    Les durées d'enchères varient de 1 à 14 jours, selon la préférence du vendeur. L'heure de fin est
                    toujours clairement affichée.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Proposez-vous l'expédition internationale ?</h3>
                  <p className="text-sm text-muted-foreground">
                    De nombreux vendeurs proposent l'expédition internationale. Les options d'expédition et les coûts
                    sont indiqués dans chaque description d'enchère.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <Link href="/faq">
              <Button variant="outline" size="lg">
                Voir Toutes les FAQ
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="rounded-xl bg-muted p-8 text-center">
          <div className="mx-auto max-w-[700px] space-y-4">
            <div className="flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <HelpCircle className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h2 className="text-2xl font-bold tracking-tighter">Besoin d'Aide Supplémentaire ?</h2>
            <p className="text-muted-foreground">
              Notre équipe d'assistance est disponible pour vous aider avec toutes vos questions ou préoccupations
              concernant l'utilisation d'EnchèrePro.
            </p>
            <Link href="/contact">
              <Button className="mt-4">
                Contacter le Support
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

