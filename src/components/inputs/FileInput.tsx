import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

interface FileInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  multiple?: boolean;
}

const FileInput = <T extends FieldValues>({
  control,
  name,
  multiple = false,
}: FileInputProps<T>) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <input
        type="file"
        multiple={multiple}
        onChange={(e) => field.onChange(e.target.files)}
      />
    )}
  />
);

export default FileInput;
