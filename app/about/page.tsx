import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Shield, Award, HeartHandshake } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="space-y-12">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">À Propos d'EnchèrePro</h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            La plateforme d'enchères en ligne de confiance qui connecte collectionneurs, passionnés et vendeurs du monde
            entier
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter">Notre Histoire</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Fondée en 2018, EnchèrePro a débuté avec une mission simple : créer un marché en ligne de confiance où
                les collectionneurs et les passionnés pourraient découvrir des articles uniques et où les vendeurs
                pourraient atteindre un public mondial.
              </p>
              <p>
                Ce qui a commencé comme une petite plateforme spécialisée dans les montres vintage s'est transformé en
                un site d'enchères complet proposant des milliers d'articles dans des dizaines de catégories, des
                beaux-arts et objets de collection aux produits de luxe et souvenirs rares.
              </p>
              <p>
                Aujourd'hui, EnchèrePro héberge plus de 000 enchères mensuelles, connectant acheteurs et vendeurs de
                plus de 50 pays. Notre équipe dévouée travaille sans relâche pour garantir que chaque enchère soit
                sécurisée, transparente et agréable pour tous les participants.
              </p>
            </div>
            <Link href="/how-it-works">
              <Button className="mt-4">
                Comment Ça Marche
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-xl">
            <Image
              src="/placeholder.svg?height=720&width=1280"
              alt="Équipe EnchèrePro"
              width={1280}
              height={720}
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter">Nos Valeurs</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground">
            Les principes qui guident tout ce que nous faisons chez EnchèrePro
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Confiance & Sécurité</h3>
                  <p className="text-muted-foreground">
                    Nous privilégions la création d'un environnement sécurisé avec des utilisateurs vérifiés et des
                    transactions sécurisées.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Qualité & Authenticité</h3>
                  <p className="text-muted-foreground">
                    Nous maintenons des normes élevées pour les annonces et aidons à vérifier l'authenticité des
                    articles.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <HeartHandshake className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Communauté</h3>
                  <p className="text-muted-foreground">
                    Nous favorisons les connexions entre collectionneurs, passionnés et vendeurs qui partagent les mêmes
                    passions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter">Notre Équipe</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground">
            Rencontrez les personnes passionnées derrière EnchèrePro
          </p>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mt-8">
            <div className="flex flex-col items-center space-y-2">
              <div className="relative h-32 w-32 overflow-hidden rounded-full">
                <Image src="/placeholder.svg?height=128&width=128" alt="Sarah Martin" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold">Sarah Martin</h3>
              <p className="text-sm text-muted-foreground">PDG & Co-Fondatrice</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="relative h-32 w-32 overflow-hidden rounded-full">
                <Image src="/placeholder.svg?height=128&width=128" alt="Michel Chen" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold">Michel Chen</h3>
              <p className="text-sm text-muted-foreground">CTO & Co-Fondateur</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="relative h-32 w-32 overflow-hidden rounded-full">
                <Image
                  src="/placeholder.svg?height=128&width=128"
                  alt="Elena Rodriguez"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">Elena Rodriguez</h3>
              <p className="text-sm text-muted-foreground">Directrice des Opérations</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="relative h-32 w-32 overflow-hidden rounded-full">
                <Image src="/placeholder.svg?height=128&width=128" alt="David Kim" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold">David Kim</h3>
              <p className="text-sm text-muted-foreground">Directeur du Service Client</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter text-center">En Chiffres</h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-2 text-center">
                  <p className="text-4xl font-bold">10K+</p>
                  <p className="text-muted-foreground">Enchères Mensuelles</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-2 text-center">
                  <p className="text-4xl font-bold">50+</p>
                  <p className="text-muted-foreground">Pays Desservis</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-2 text-center">
                  <p className="text-4xl font-bold">500K+</p>
                  <p className="text-muted-foreground">Utilisateurs Inscrits</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-2 text-center">
                  <p className="text-4xl font-bold">98%</p>
                  <p className="text-muted-foreground">Taux de Satisfaction</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="rounded-xl bg-muted p-8 text-center">
          <div className="mx-auto max-w-[700px] space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter">Rejoignez Notre Équipe</h2>
            <p className="text-muted-foreground">
              Nous recherchons toujours des personnes talentueuses qui sont passionnées par la création d'expériences
              exceptionnelles pour les collectionneurs et les passionnés.
            </p>
            <Link href="/careers">
              <Button className="mt-4">
                Voir les Postes Ouverts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

