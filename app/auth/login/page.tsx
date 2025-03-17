"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Clock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { login } from "@/services/authService"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/auctions"
  const { toast } = useToast()

  const validateForm = (): { valid: boolean, message?: string } => {
    if (!email.trim()) {
      return { valid: false, message: "L'email est requis" };
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { valid: false, message: "Format d'email invalide" };
    }

    if (!password) {
      return { valid: false, message: "Le mot de passe est requis" };
    }

    return { valid: true };
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validate form
    const validation = validateForm();
    if (!validation.valid) {
      toast({
        title: "Champs invalides",
        description: validation.message,
        variant: "destructive",
      })
      return;
    }

    setIsLoading(true)

    try {
      console.log('Attempting login with:', { email, password });
      const response = await login(email, password)

      toast({
        title: "Connexion réussie",
        description: `Bienvenue, ${response.user.username} !`,
      })

      // Redirect to callback URL or auctions page
      router.push("/auctions")
    } catch (error: any) {
      console.error("Login error:", error);

      // More detailed error handling
      let errorMessage = "Veuillez vérifier vos identifiants et réessayer.";

      if (error.response) {
        console.log('Error response:', error.response);
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        errorMessage = error.response.data?.message ||
          error.response.data?.error ||
          `Erreur ${error.response.status}: ${error.response.statusText}`;
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = "Aucune réponse du serveur. Veuillez vérifier votre connexion.";
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage = error.message || "Une erreur s'est produite lors de la connexion.";
      }

      toast({
        title: "Échec de la connexion",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <div className="flex justify-center">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <Image src="/logo.png" alt="EL BATA Logo" width={40} height={40} />
              <span>EL BATA</span>
            </Link>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Bon retour parmi nous</h1>
          <p className="text-sm text-muted-foreground">Entrez vos identifiants pour vous connecter à votre compte</p>
        </div>

        <div className="grid gap-6">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="nom@exemple.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Link href="/auth/reset-password" className="text-xs text-muted-foreground hover:text-primary">
                    Mot de passe oublié ?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoCapitalize="none"
                    autoComplete="current-password"
                    disabled={isLoading}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">
                      {showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    </span>
                  </Button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm font-normal">
                  Se souvenir de moi
                </Label>
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Connexion en cours..." : "Se connecter"}
              </Button>
            </div>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Ou continuer avec</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" disabled={isLoading}>
              Google
            </Button>
            <Button variant="outline" disabled={isLoading}>
              Facebook
            </Button>
          </div>
        </div>

        <p className="px-8 text-center text-sm text-muted-foreground">
          Vous n'avez pas de compte ?{" "}
          <Link href="/auth/signup" className="hover:text-primary underline underline-offset-4">
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  )
}

