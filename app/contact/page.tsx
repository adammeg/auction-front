"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Dans une vraie application, ce serait un appel API pour envoyer le formulaire de contact
    try {
      // Simuler un appel API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Message envoyé avec succès",
        description: "Nous vous répondrons dès que possible.",
      })

      // Réinitialiser le formulaire
      e.currentTarget.reset()
    } catch (error) {
      toast({
        title: "Erreur lors de l'envoi du message",
        description: "Un problème est survenu lors de l'envoi de votre message. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contactez-Nous</h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Vous avez des questions ou besoin d'assistance ? Nous sommes là pour vous aider.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Contactez-Nous</h2>
              <p className="mt-2 text-muted-foreground">
                Remplissez le formulaire et notre équipe vous répondra dans les 24 heures.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">Prénom</Label>
                  <Input id="first-name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Nom</Label>
                  <Input id="last-name" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Sujet</Label>
                <Select required>
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="Sélectionnez un sujet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">Demande Générale</SelectItem>
                    <SelectItem value="support">Support Client</SelectItem>
                    <SelectItem value="billing">Question de Facturation</SelectItem>
                    <SelectItem value="partnership">Opportunité de Partenariat</SelectItem>
                    <SelectItem value="feedback">Commentaires</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Comment pouvons-nous vous aider ?"
                  className="min-h-[150px]"
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Envoi en cours..." : "Envoyer le Message"}
              </Button>
            </form>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Informations de Contact</h2>
              <p className="mt-2 text-muted-foreground">Vous pouvez également nous joindre par ces canaux.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-start gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">Envoyez-nous un Email</h3>
                    <p className="text-sm text-muted-foreground">Pour les demandes générales et le support</p>
                    <a href="mailto:support@encherepro.com" className="text-primary hover:underline">
                      support@encherepro.com
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-start gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">Appelez-Nous</h3>
                    <p className="text-sm text-muted-foreground">Du lundi au vendredi, de 9h à 17h CET</p>
                    <a href="tel:+33123456789" className="text-primary hover:underline">
                      +33 1 23 45 67 89
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-start gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">Visitez-Nous</h3>
                    <p className="text-sm text-muted-foreground">Notre siège social</p>
                    <address className="not-italic text-primary">
                      123 Rue des Enchères
                      <br />
                      75001 Paris
                      <br />
                      France
                    </address>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-start gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">Heures d'Ouverture</h3>
                    <p className="text-sm text-muted-foreground">Quand nous sommes disponibles</p>
                    <ul className="space-y-1 text-sm">
                      <li>
                        <span className="font-medium">Lundi-Vendredi :</span> 9h00 - 17h00 CET
                      </li>
                      <li>
                        <span className="font-medium">Samedi :</span> 10h00 - 14h00 CET
                      </li>
                      <li>
                        <span className="font-medium">Dimanche :</span> Fermé
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="rounded-xl border p-6">
              <h3 className="text-lg font-semibold">Foire Aux Questions</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Trouvez des réponses rapides aux questions courantes dans notre section FAQ.
              </p>
              <Link href="/faq">
                <Button variant="link" className="mt-2 p-0">
                  Voir la FAQ
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="rounded-xl bg-muted p-6">
              <h3 className="text-lg font-semibold">Suivez-Nous</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Restez informé de nos dernières enchères et actualités.
              </p>
              <div className="mt-4 flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                  <span className="sr-only">Facebook</span>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  <span className="sr-only">Instagram</span>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                  <span className="sr-only">Twitter</span>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  <span className="sr-only">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

