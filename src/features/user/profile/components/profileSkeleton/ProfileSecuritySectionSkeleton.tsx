import { Skeleton } from "../../../../../components/ui/Skeleton";

const ProfileSecuritySectionSkeleton = () => {
  return (
    <div className="flex flex-col gap-8 my-12">
      <div className="md:h-25 space-y-3">
        <Skeleton className="h-7 w-50" />
        <div className="flex flex-col md:flex-row justify-between gap-3">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />

            <div className="flex flex-col gap-2 w-full">
              <Skeleton className="h-5 w-45 md:w-70" />
              <Skeleton className="h-4 w-35 md:w-40" />
            </div>
          </div>

          <Skeleton className="h-15 w-full md:max-w-60 rounded-md" />
        </div>
      </div>

      <div className="h-25 space-y-3">
        <Skeleton className="h-7 w-50" />

        <div className="flex justify-between flex-col md:flex-row gap-3 items-center">
          <Skeleton className="h-14 w-full md:w-20/41 rounded-lg" />
          <Skeleton className="h-15 w-full md:max-w-60 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default ProfileSecuritySectionSkeleton;
