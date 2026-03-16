import type { ReactNode, FormHTMLAttributes } from "react";

interface IForm extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}

const Form = ({ children, className, ...props }: IForm) => {
  return (
    <form {...props} className={`flex flex-col gap-4 ${className ?? ""}`}>
      {children}
    </form>
  );
};

export default Form;
