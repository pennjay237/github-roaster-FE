import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function RoastSkeleton() {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Roast Card Skeleton */}
      <Card className="border-orange-200 dark:border-orange-800">
        <CardHeader className="pb-4 space-y-3">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Left */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-6 w-32 sm:w-48" />
            </div>

            {/* Right (buttons) */}
            <div className="flex gap-2">
              <Skeleton className="h-9 w-16 sm:w-20" />
              <Skeleton className="h-9 w-16 sm:w-20" />
            </div>
          </div>

          <Skeleton className="h-4 w-24 sm:w-32" />
        </CardHeader>

        <CardContent className="space-y-5 sm:space-y-6">
          {/* Paragraph Skeleton */}
          <div className="space-y-3 sm:space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12 sm:w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-10/12 sm:w-2/3" />
          </div>

          {/* Footer lines */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12 sm:w-5/6" />
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Left Stats Card */}
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-28 sm:w-32" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-24 w-full" />
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <Skeleton className="h-14 sm:h-16" />
              <Skeleton className="h-14 sm:h-16" />
            </div>
          </CardContent>
        </Card>

        {/* Right Stats Card */}
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-28 sm:w-32" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-12" />
              ))}
            </div>
            <Skeleton className="h-4 w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
