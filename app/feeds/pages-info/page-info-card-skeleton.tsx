import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PageInfoCardSkeleton() {
  return (
    <Card className="group relative flex max-h-[350px] min-h-[250px] flex-col overflow-hidden rounded-lg border border-border bg-card p-0 px-6 py-6">
      {/* Header */}
      <CardHeader className="flex items-start justify-between p-0">
        <div className="flex items-start gap-3">
          <Skeleton className="aspect-square size-[50px] rounded-full max-md:size-10" />
          <div className="flex-1">
            <Skeleton className="mb-2 h-5 w-32 max-lg:h-4" />
            <Skeleton className="mt-1 h-6 w-20 rounded-full" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative mt-auto flex flex-1 flex-col p-0 py-4">
        {/* URL */}
        <div className="mt-auto h-max rounded border border-border bg-muted/50 p-3 py-1">
          <Skeleton className="h-4 w-full" />
        </div>
      </CardContent>
      <CardFooter className="relative mt-auto flex flex-wrap items-center gap-2 p-0">
        <Skeleton className="h-9 flex-1" />
        <Skeleton className="h-9 flex-1" />
        <Skeleton className="h-9 flex-1" />
      </CardFooter>
    </Card>
  );
}

export function PageInfoCardSkeletonList({ count = 6 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <PageInfoCardSkeleton key={index} />
      ))}
    </>
  );
}
