import { Skeleton } from "../../../../../components/ui/Skeleton";

const ProfileHeaderSkeleton = () => {
  return (
    <div className="flex items-center gap-4 md:gap-6">
      <Skeleton className="size-18 sm:size-24 rounded-full" />

      <div className="flex flex-col gap-2">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-56" />
      </div>
    </div>
  );
};

export default ProfileHeaderSkeleton;
