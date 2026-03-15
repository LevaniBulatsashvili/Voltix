import { Controller } from "react-hook-form";

interface FileInputProps {
  control: any;
  name: string;
  multiple?: boolean;
}

const FileInput = ({ control, name, multiple = false }: FileInputProps) => (
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
