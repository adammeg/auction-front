"use client"

import Link from "next/link"
import { Clock, Search, Home, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function NotFoundPage() {
  return (
    <div className="container flex h-screen flex-col items-center justify-center">
      <div className="mx-auto flex max-w-[500px] flex-col items-center justify-center text-center px-4">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <Clock className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold">Page Non Trouvée</h1>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground">
          Nous n'avons pas pu trouver la page que vous cherchiez. Elle a peut-être été supprimée, renommée ou n'existait
          pas.
        </p>
        <div className="mt-8 grid gap-2 w-full">
          <form className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Rechercher des articles..." className="pl-9 pr-4" />
          </form>
          <div className="flex flex-col sm:flex-row gap-2">
            <Link href="/" className="flex-1">
              <Button variant="default" className="w-full">
                <Home className="mr-2 h-4 w-4" />
                Accueil
              </Button>
            </Link>
            <Button variant="outline" onClick={() => window.history.back()} className="flex-1">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>
          </div>
        </div>
        <div className="mt-8">
          <p className="text-sm text-muted-foreground">
            Vous cherchez quelque chose de spécifique ? Visitez nos{" "}
            <Link href="/categories" className="text-primary hover:underline">
              catégories
            </Link>{" "}
            ou{" "}
            <Link href="/contact" className="text-primary hover:underline">
              contactez le support
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

