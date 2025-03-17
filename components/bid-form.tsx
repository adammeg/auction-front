"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { placeBid } from "@/services/auctionService"
import { useUser } from "@/contexts/UserContext"

interface BidFormProps {
  currentBid: number
  minIncrement: number
  auctionId: string
  onBidPlaced?: () => void
}

export default function BidForm({ currentBid, minIncrement, auctionId, onBidPlaced }: BidFormProps) {
  const [bidAmount, setBidAmount] = useState(currentBid + minIncrement)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { isAuthenticated, user } = useUser()

  const handleBidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value)
    setBidAmount(isNaN(value) ? 0 : value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Check if user is authenticated
    if (!isAuthenticated) {
      toast({
        title: "Connexion requise",
        description: "Vous devez être connecté pour placer une enchère.",
        variant: "destructive",
      })
      router.push(`/auth/login?redirect=/auctions/${auctionId}`)
      return
    }

    // Validate bid amount
    if (bidAmount < currentBid + minIncrement) {
      toast({
        title: "Montant d'enchère invalide",
        description: `Votre enchère doit être d'au moins ${currentBid + minIncrement} DT`,
        variant: "destructive",
      })
      return
    }

    setIsDialogOpen(true)
  }

  const confirmBid = async () => {
    setIsSubmitting(true)

    try {
      // Call the API to place the bid
      const response = await placeBid(auctionId, bidAmount)
      
      toast({
        title: "Enchère placée avec succès !",
        description: `Vous avez placé une enchère de ${bidAmount} DT sur cet article.`,
      })

      // Refresh the data or call the callback
      if (onBidPlaced) {
        onBidPlaced()
      } else {
        router.refresh()
      }
      
    } catch (error: any) {
      console.error("Error placing bid:", error)
      
      // Handle specific error messages from the API
      let errorMessage = "Un problème est survenu lors du placement de votre enchère."
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error.message) {
        errorMessage = error.message
      }
      
      toast({
        title: "Erreur lors du placement de l'enchère",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
      setIsDialogOpen(false)
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground">DT</span>
            <Input
              type="number"
              value={bidAmount}
              onChange={handleBidChange}
              min={currentBid + minIncrement}
              step={minIncrement}
              className="pl-7"
            />
          </div>
          <Button type="submit">Enchérir</Button>
        </div>
      </form>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer votre enchère</DialogTitle>
            <DialogDescription>
              Vous êtes sur le point de placer une enchère de {bidAmount} DT sur cet article. Cette action ne peut pas
              être annulée.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 py-4">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Enchère actuelle :</span>
              <span className="font-medium">{currentBid} DT</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Votre enchère :</span>
              <span className="font-medium">{bidAmount} DT</span>
            </div>
            {user && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Enchérisseur :</span>
                <span className="font-medium">{user.username}</span>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={confirmBid} disabled={isSubmitting}>
              {isSubmitting ? "Traitement en cours..." : "Confirmer l'enchère"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

