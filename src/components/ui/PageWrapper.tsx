import type { ReactNode } from "react";

interface IPageWrapper {
  children: ReactNode;
  className?: string;
}

const PageWrapper = ({ children, className }: IPageWrapper) => {
  return (
    <div
      className={`p-6 w-full md:w-[95%] lg:w-[90%] min-h-[88dvh] flex flex-col ${className}`}
    >
      {children}
    </div>
  );
};

export default PageWrapper;
