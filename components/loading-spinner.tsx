interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullPage?: boolean;
}

export default function LoadingSpinner({ 
  size = 'md', 
  text = 'Chargement...', 
  fullPage = false 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };
  
  const spinner = (
    <div className="flex flex-col items-center justify-center">
      <div className={`animate-spin ${sizeClasses[size]} border-2 border-primary border-t-transparent rounded-full`}></div>
      {text && <p className="text-muted-foreground mt-4">{text}</p>}
    </div>
  );
  
  if (fullPage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
        {spinner}
      </div>
    );
  }
  
  return spinner;
} 