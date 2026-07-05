import { Skeleton } from "@/components/ui/skeleton";
interface SkeletonUIProps {
  numElements: number;
}

export default function SkeletonUI({ numElements }: SkeletonUIProps) {
  return <>
        {Array.from({ length: numElements }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-3 border rounded-md p-4 mt-2"
          >
            <Skeleton className="h-16 w-16 rounded-md" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        ))} 
  </>
}
