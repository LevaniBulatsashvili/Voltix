import { Skeleton } from "../../../../../components/ui/Skeleton";

const ProfileSkeleton = () => {
  return (
    <div className="w-full">
      <div className="bg-white my-12 w-[90%] mx-auto">
        <div className="h-25 bg-gray-200" />

        <div className="p-10 text-black">
          <div className="h-41 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Skeleton className="w-20 h-20 rounded-full" />

              <div>
                <Skeleton className="h-6 w-40 mb-2" />
                <Skeleton className="h-4 w-60" />
              </div>
            </div>

            <Skeleton className="h-10 w-28 rounded-lg" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />

            <div className="sm:col-span-2">
              <Skeleton className="h-14 w-full" />
            </div>
          </div>

          <div className="mt-10 space-y-6">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
