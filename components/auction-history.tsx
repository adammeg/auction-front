"use client"

import { useState, useEffect } from "react"

// Données fictives pour l'historique des enchères
const generateBidHistory = (auctionId: number) => {
  const now = new Date()
  const history = []

  // Générer 8 enchères aléatoires
  for (let i = 0; i < 8; i++) {
    const bidTime = new Date(now.getTime() - i * 3600000 * Math.random() * 5)
    const bidAmount = 300 + Math.floor(Math.random() * 150) + i * 5

    history.push({
      id: i + 1,
      userId: `user${Math.floor(Math.random() * 1000)}`,
      username: `enchérisseur${Math.floor(Math.random() * 1000)}`,
      amount: bidAmount,
      time: bidTime,
    })
  }

  // Trier par heure (plus récent d'abord)
  return history.sort((a, b) => b.time.getTime() - a.time.getTime())
}

interface AuctionHistoryProps {
  auctionId: number
}

export default function AuctionHistory({ auctionId }: AuctionHistoryProps) {
  const [bidHistory, setBidHistory] = useState<any[]>([])

  useEffect(() => {
    // Dans une vraie application, ce serait un appel API
    const history = generateBidHistory(auctionId)
    setBidHistory(history)
  }, [auctionId])

  if (bidHistory.length === 0) {
    return <div className="text-center py-4 text-muted-foreground">Chargement de l'historique des enchères...</div>
  }

  return (
    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
      {bidHistory.map((bid) => (
        <div key={bid.id} className="flex items-center justify-between py-2 border-b last:border-0">
          <div className="flex flex-col">
            <span className="font-medium">{bid.username}</span>
            <span className="text-xs text-muted-foreground">{bid.time.toLocaleString()}</span>
          </div>
          <span className="font-bold">{bid.amount} €</span>
        </div>
      ))}
    </div>
  )
}

