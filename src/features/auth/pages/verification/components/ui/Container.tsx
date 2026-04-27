import type { ReactNode } from "react";

interface IContainer {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className = "" }: IContainer) => {
  return (
    <div
      className={`px-8 sm:px-14 mx-5 py-10 text-center rounded-2xl w-auto sm:w-120 border text-primary border-primary/80 ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
