import type { ReactNode } from "react";

interface IFormContainer {
  children: ReactNode;
  className?: string;
}

const FormContainer = ({ children, className }: IFormContainer) => {
  return (
    <div
      className={`px-8 sm:px-14 mx-5 py-10 border text-primary border-primary/80 rounded-2xl w-auto sm:w-120 ${className ?? ""}`}
    >
      {children}
    </div>
  );
};

export default FormContainer;
