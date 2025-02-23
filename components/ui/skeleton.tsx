import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-200", className)}
      {...props}
    />
  );
}

function DisasterSkeletonCard({
  count,
  className,
}: {
  count: number;
  className: string;
}) {
  return new Array(count).fill(0).map((_,i) => (
    <div key={i} className={`flex flex-col space-y-3`}>
      <Skeleton className={` ${className} h-[150px] md:w-[300px] rounded-xl`} />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ));
}

function ProfileSkeleton() {
  return (
    <div
      id="profile-info-skeleton"
      className="p-10 w-full h-auto flex justify-center"
    >
      <div className="p-4 w-full md:w-2/3">
        {/* Avatar Skeleton */}
        <div className="h-auto mb-10 flex justify-center items-center">
          <Skeleton className="w-24 h-24 rounded-full" />
        </div>

        {/* Input Fields Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Button Skeleton */}
        <Skeleton className="h-10 w-full mt-3" />
      </div>
    </div>
  );
}

function TableRowSkeleton() {
  return (
    <>
      {Array(5)
        .fill(null)
        .map((_, rowIndex) => (
          <tr key={rowIndex} className="border-t">
            {Array(8)
              .fill(null)
              .map((_, colIndex) => (
                <td key={colIndex} className="px-6 py-3">
                  <Skeleton className="h-4 w-full" />
                </td>
              ))}
          </tr>
        ))}
    </>
  );
}
export {
  Skeleton,
  DisasterSkeletonCard,
  ProfileSkeleton,
  TableRowSkeleton,
};
