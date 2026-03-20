import { forwardRef, type InputHTMLAttributes } from "react";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type?: string;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, IInput>(
  ({ name, type = "text", className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        id={name}
        name={name}
        type={type}
        className={`
          h-14 w-full p-5 text-black text-lg rounded-lg focus:outline-gray-400 bg-gray-200 disabled:opacity-90 disabled:cursor-not-allowed
          ${className}
        `}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
