import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FormInput } from "./FormInput";
import type {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface IPasswordField<TFormValues extends FieldValues> {
  label: string;
  name: Path<TFormValues>;
  register: UseFormRegister<TFormValues>;
  errors: FieldErrors<TFormValues>;
  placeholder: string;
}

const PasswordInput = <TFormValues extends FieldValues>({
  label,
  register,
  name,
  errors,
  placeholder,
}: IPasswordField<TFormValues>) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <FormInput<TFormValues>
        type={showPassword ? "text" : "password"}
        label={label}
        placeholder={placeholder}
        register={register}
        name={name}
        errors={errors}
      />

      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-5 top-15 text-gray-500"
      >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
};

export default PasswordInput;
