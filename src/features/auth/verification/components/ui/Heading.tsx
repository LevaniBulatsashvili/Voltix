import type { ReactNode } from "react";

interface IHeading {
  children: ReactNode;
  className?: string;
}

const Heading = ({ children, className = "" }: IHeading) => {
  return (
    <h1
      className={`text-3xl font-bold mb-6 text-center capitalize ${className}`}
    >
      {children}
    </h1>
  );
};

export default Heading;
