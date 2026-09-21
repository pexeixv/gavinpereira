import { Skeleton } from '@/components/ui/skeleton'

/** Shown while a lazily loaded route chunk is still downloading. */
export function PageFallback() {
  return (
    <div className="container-page flex flex-col items-center gap-6 py-20">
      <span className="sr-only" role="status">
        Loading page
      </span>
      <Skeleton className="h-10 w-3/5 max-w-md" />
      <Skeleton className="h-4 w-4/5 max-w-lg" />
      <Skeleton className="h-4 w-2/3 max-w-md" />
      <div className="mt-8 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }, (_, index) => (
          <Skeleton key={index} className="aspect-[1380/1080] w-full" />
        ))}
      </div>
    </div>
  )
}
