import { forwardRef, type InputHTMLAttributes } from "react";
import { useTranslation } from "react-i18next";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, IInput>(
  (
    { name, type = "text", placeholder = "", className = "", ...props },
    ref,
  ) => {
    const { t } = useTranslation();

    return (
      <input
        ref={ref}
        id={name}
        name={name}
        type={type}
        placeholder={t(placeholder)}
        className={`
          h-14 w-full p-5 text-black text-lg rounded-lg focus:outline-gray-400 bg-gray-200 disabled:opacity-90 disabled:cursor-not-allowed placeholder:capitalize
          ${className}
        `}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
