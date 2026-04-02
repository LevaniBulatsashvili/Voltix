const EmailSectionSkeleton = () => {
  return (
    <div className="mt-8 space-y-5">
      <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
          <div className="flex flex-col gap-1">
            <div className="h-5 w-48 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        <div className="h-14 w-60 bg-gray-200 rounded animate-pulse md:justify-self-end"></div>
      </div>
    </div>
  );
};

export default EmailSectionSkeleton;
