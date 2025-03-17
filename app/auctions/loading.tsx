import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="flex flex-col gap-8">
        <div>
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-5 w-72 mt-2" />
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex gap-2 flex-1">
            <Skeleton className="h-10 w-[300px]" />
            <Skeleton className="h-10 w-[100px]" />
          </div>
          
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-[180px]" />
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-20" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {Array(8).fill(0).map((_, i) => (
            <div key={i} className="flex flex-col">
              <Skeleton className="aspect-[4/3] w-full" />
              <Skeleton className="h-6 w-3/4 mt-4" />
              <Skeleton className="h-4 w-full mt-2" />
              <Skeleton className="h-4 w-full mt-1" />
              <div className="flex justify-between mt-4">
                <div>
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-6 w-24 mt-1" />
                </div>
                <div>
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-20 mt-1" />
                </div>
              </div>
              <Skeleton className="h-10 w-full mt-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

