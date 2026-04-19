import type { ProductFormData } from "@/features/admin/product/schemas/productSchema";
import { useController, type Control } from "react-hook-form";
import { Label } from "./Label";
import { Select } from "@/components/ui/Select";
import { useAppSelector } from "@/hooks/redux";
import { useFlicker } from "@/hooks/useFlicker";

interface IFormSelect {
  name: keyof ProductFormData;
  label: string;
  control: Control<ProductFormData>;
  options: { value: string; label: string }[];
  error?: string;
  baseLabel?: string;
  isLoading?: boolean;
}

const FormSelect = ({
  name,
  label,
  control,
  options,
  error,
  baseLabel,
  isLoading,
}: IFormSelect) => {
  const { permaLoadingState, flickerLoadingState } = useAppSelector(
    (state) => state.settings,
  );
  const flicker = useFlicker({ flickerLoading: flickerLoadingState });
  const { field } = useController({ name, control });

  return (
    <div>
      <Label htmlFor={name} text={label} />
      {isLoading || permaLoadingState || flicker === "loading" ? (
        <div className="h-14 w-full bg-gray-200 rounded-lg animate-pulse" />
      ) : (
        <Select
          value={String(field.value ?? "")}
          onChange={(val) => field.onChange(val === "" ? "" : Number(val))}
          options={options}
          baseLabel={baseLabel}
          selectBtnClassName="py-4"
        />
      )}
      {!error?.includes("errors.") && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default FormSelect;
