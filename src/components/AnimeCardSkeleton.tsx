import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const AnimeCardSkeleton = () => {
  return (
    <Card className="bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 overflow-hidden hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors pt-0">
      <div className="flex flex-col h-full">
        
        {/* Image + Badge placeholder */}
        <div className="relative aspect-[4/5]">
          <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
          <Skeleton className="absolute top-2 right-2 h-6 w-16 rounded-full" />
        </div>

        {/* Card Content */}
        <CardContent className="flex-1 flex flex-col p-4">
          
          {/* Title Placeholder */}
          <Skeleton className="h-6 w-3/4 mb-4" />
          
          <div className="mt-auto space-y-4">
            {/* Upcoming Episode info */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full" /> {/* Calendar Icon */}
              <Skeleton className="h-4 w-1/2" />
            </div>

            {/* Countdown box */}
            <div className="bg-zinc-100 dark:bg-zinc-900 rounded-lg p-3 mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full" /> {/* Clock Icon */}
                <Skeleton className="h-4 w-1/2" />
              </div>
              <Skeleton className="h-6 w-full" /> {/* Countdown timer */}
            </div>
          </div>

        </CardContent>
      </div>
    </Card>
  );
};

export default AnimeCardSkeleton;
