import { shallowEqual } from "react-redux";
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { useAppSelector } from "@/hooks/redux";
import { useFlicker } from "@/hooks/useFlicker";
import { Label } from "./Label";
import { Select } from "@/components/ui/Select";
import type { RootState } from "@/store";

interface IFormSelect<T extends FieldValues> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  options: { value: string | number; label: string }[];
  error?: string;
  baseLabel?: string;
  isLoading?: boolean;
}

const selectLoadingSettings = (state: RootState) => ({
  permaLoadingState: state.settings.permaLoadingState,
  flickerLoadingState: state.settings.flickerLoadingState,
});

const FormSelect = <T extends FieldValues>({
  name,
  label,
  control,
  options,
  error,
  baseLabel,
  isLoading,
}: IFormSelect<T>) => {
  const { permaLoadingState, flickerLoadingState } = useAppSelector(
    selectLoadingSettings,
    shallowEqual,
  );
  const flicker = useFlicker({ flickerLoading: flickerLoadingState });
  const { field } = useController({ name, control });

  const showLoading = isLoading || permaLoadingState || flicker === "loading";
  const showError = error && !error.includes("errors.");

  return (
    <div>
      <Label htmlFor={name} text={label} />
      {showLoading ? (
        <div className="h-14 w-full bg-gray-200 rounded-lg animate-pulse" />
      ) : (
        <Select
          value={String(field.value ?? "")}
          onChange={(val) => field.onChange(val === "" ? "" : Number(val))}
          options={options.map((o) => ({ ...o, value: String(o.value) }))}
          baseLabel={baseLabel}
          selectBtnClassName="py-4"
        />
      )}
      {showError && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FormSelect;
