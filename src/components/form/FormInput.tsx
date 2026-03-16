import type {
  FieldErrors,
  UseFormRegister,
  FieldValues,
  Path,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  placeholder: string;
  type?: string;
}

export const FormInput = <T extends FieldValues>({
  name,
  register,
  errors,
  placeholder,
  type = "text",
}: FormInputProps<T>) => {
  const { t } = useTranslation();
  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div className="flex flex-col">
      <input
        type={type}
        placeholder={t(placeholder)}
        {...register(name)}
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary/70"
      />
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">{t(errorMessage)}</p>
      )}
    </div>
  );
};
