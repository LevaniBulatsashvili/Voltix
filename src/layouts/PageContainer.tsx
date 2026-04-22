import { Skeleton } from "@/components/skeleton/Skeleton";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const PageContainer = () => {
  return (
    <main className="flex-1 flex flex-col justify-center items-center min-h-[88dvh]">
      <Suspense fallback={<Skeleton className="w-full min-h-[88dvh]" />}>
        <Outlet />
      </Suspense>
    </main>
  );
};

export default PageContainer;
