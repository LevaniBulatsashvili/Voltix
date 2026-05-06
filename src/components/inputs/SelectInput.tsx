import type { ChangeEvent } from "react";

interface ISelectInput {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}

export default function SelectInput({
  name,
  value,
  onChange,
  options,
}: ISelectInput) {
  return (
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full mb-2 border border-gray-300 bg-background rounded px-3 py-2 text-lg focus:outline-none cursor-pointer"
    >
      <option value="" disabled hidden>
        -- Select an option --
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
