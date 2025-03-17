import { Button } from "@/components/ui/button"

interface ErrorDisplayProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorDisplay({ 
  message = "Une erreur s'est produite", 
  onRetry 
}: ErrorDisplayProps) {
  return (
    <div className="rounded-lg border border-destructive/50 p-6 text-center">
      <p className="text-destructive mb-2 font-medium">Erreur</p>
      <p className="text-sm text-muted-foreground mb-4">{message}</p>
      {onRetry && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRetry}
        >
          Réessayer
        </Button>
      )}
    </div>
  )
}