import {
  type UseFormRegister,
  type FieldErrors,
  type Path,
  type FieldValues,
} from "react-hook-form";
import Input from "./Input";
import { Label } from "./Label";

interface IFormInput<T extends FieldValues> {
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}

export const FormInput = <T extends FieldValues>({
  name,
  label,
  register,
  errors,
  type = "text",
  placeholder,
  disabled,
}: IFormInput<T>) => {
  const error = errors?.[name]?.message as string | undefined;

  return (
    <div>
      <Label htmlFor={String(name)} text={label} />

      <Input
        type={type}
        placeholder={placeholder ?? String(name)}
        disabled={disabled}
        {...register(name)}
      />

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};
