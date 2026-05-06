import { cn } from "@/utils/cn";
import type { ReactNode, FormHTMLAttributes } from "react";

interface IForm extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}

const Form = ({ children, className, ...props }: IForm) => (
  <form {...props} className={cn("flex flex-col gap-4", className)}>
    {children}
  </form>
);

export default Form;
