import { Skeleton } from "../../../../../components/skeleton/Skeleton";

const ProfileHeaderWithActionsSkeleton = () => {
  return (
    <div className="h-41 flex flex-col md:flex-row items-center gap-5 sm:gap-0 sm:justify-between">
      <div className="flex items-center gap-4 md:gap-6">
        <Skeleton className="size-18 sm:size-24 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-56" />
        </div>
      </div>

      <Skeleton className="h-12 w-25 rounded-lg" />
    </div>
  );
};

export default ProfileHeaderWithActionsSkeleton;
