import { Skeleton } from "@/components/skeleton/Skeleton";

const ProfileOrdersSkeleton = () => {
  const fakeOrders = Array.from({ length: 2 });

  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      {fakeOrders.map((_, idx) => (
        <div key={idx} className="bg-white p-6 rounded-lg shadow space-y-4">
          <div className="flex justify-between items-center">
            <Skeleton className="h-6 w-32 rounded-md" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>

          <Skeleton className="h-4 w-24 rounded-md" />

          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, itemIdx) => (
              <div key={itemIdx} className="flex justify-between">
                <Skeleton className="h-4 w-32 rounded-md" />
                <Skeleton className="h-4 w-16 rounded-md" />
              </div>
            ))}
            <div className="flex justify-between">
              <Skeleton className="h-4 w-24 rounded-md" />
              <Skeleton className="h-4 w-16 rounded-md" />
            </div>
          </div>

          <div className="border-t pt-3 flex justify-between">
            <Skeleton className="h-5 w-16 rounded-md" />
            <Skeleton className="h-5 w-20 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileOrdersSkeleton;
