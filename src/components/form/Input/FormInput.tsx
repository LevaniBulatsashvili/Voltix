import {
  type UseFormRegister,
  type FieldErrors,
  type Path,
  type FieldValues,
  get,
} from "react-hook-form";
import Input from "./Input";
import { Label } from "./Label";
import { useTranslation } from "react-i18next";

interface IFormInput<T extends FieldValues> {
  name: Path<T>;
  label?: string;
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
  const { t } = useTranslation();
  const error = get(errors, name)?.message as string | undefined;

  return (
    <div>
      {label && <Label htmlFor={String(name)} text={t(label)} />}

      <Input
        type={type}
        placeholder={placeholder ? t(placeholder) : String(t(name))}
        disabled={disabled}
        {...register(name)}
      />

      {error && (
        <p className="mt-1 text-sm text-red-500">{t(`errors.${error}`)}</p>
      )}
    </div>
  );
};
