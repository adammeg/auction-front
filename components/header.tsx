"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Search, Menu, X, Bell, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { isAuthenticated, logout, getCurrentUser } from "@/services/authService"
import { useToast } from "@/hooks/use-toast"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check authentication status on component mount and when it changes
    const checkAuth = () => {
      const authStatus = isAuthenticated()
      setIsLoggedIn(authStatus)
      
      if (authStatus) {
        const user = getCurrentUser()
        setUsername(user?.username || "")
      }
    }
    
    checkAuth()
    
    // Set up event listener for storage changes (for when user logs in/out in another tab)
    const handleStorageChange = () => {
      checkAuth()
    }
    
    window.addEventListener('storage', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setIsOpen(false)
    }
  }

  const handleLogout = () => {
    logout()
    setIsLoggedIn(false)
    setUsername("")
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès",
    })
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <div className="flex items-center justify-between border-b pb-4">
              <Link href="/" className="flex items-center gap-2 font-bold" onClick={() => setIsOpen(false)}>
                <Image src="/logo.png" alt="EL BATA Logo" width={32} height={32} />
                <span>EL BATA</span>
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>
            <nav className="flex flex-col gap-4 py-4">
              <Link href="/auctions" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                Enchères
              </Link>
              <Link href="/categories" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                Catégories
              </Link>
              <Link href="/about" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                À Propos
              </Link>
              <Link href="/help" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                Aide
              </Link>
            </nav>
            <div className="mt-auto border-t pt-4">
              {isLoggedIn ? (
                <>
                  <div className="mb-4 flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{username}</p>
                      <p className="text-xs text-muted-foreground">Connecté</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link href="/dashboard" className="text-sm font-medium" onClick={() => setIsOpen(false)}>
                      Tableau de Bord
                    </Link>
                    <Link href="/my-bids" className="text-sm font-medium" onClick={() => setIsOpen(false)}>
                      Mes Enchères
                    </Link>
                    <Link href="/my-listings" className="text-sm font-medium" onClick={() => setIsOpen(false)}>
                      Mes Annonces
                    </Link>
                    <Button variant="ghost" className="justify-start px-2" onClick={() => {
                      handleLogout()
                      setIsOpen(false)
                    }}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Déconnexion
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                    <Button className="w-full">Se Connecter</Button>
                  </Link>
                  <Link href="/auth/signup" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">S'Inscrire</Button>
                  </Link>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center gap-2 font-bold mr-4">
          <Image src="/logo.png" alt="EL BATA Logo" width={32} height={32} />
          <span className="hidden md:inline-block">EL BATA</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-6 mx-6">
          <Link href="/auctions" className="text-sm font-medium">
            Enchères
          </Link>
          <Link href="/categories" className="text-sm font-medium">
            Catégories
          </Link>
          <Link href="/about" className="text-sm font-medium">
            À Propos
          </Link>
          <Link href="/help" className="text-sm font-medium">
            Aide
          </Link>
        </nav>
        <form onSubmit={handleSearch} className="flex-1 ml-auto mr-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher des enchères..."
              className="w-full pl-8 md:w-[300px] lg:w-[400px] ml-auto"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
        <div className="hidden md:flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <Link href="/dashboard/create-auction">
                <Button variant="default" size="sm">
                  Créer une Enchère
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Tableau de Bord</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/my-bids">Mes Enchères</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/my-listings">Mes Annonces</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">
                  Se Connecter
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm">
                  S'Inscrire
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}