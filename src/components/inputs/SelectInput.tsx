import React from "react";

interface ISelectInput {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}

export default function SelectInput({
  name,
  value,
  onChange,
  options,
}: ISelectInput) {
  return (
    <div className="w-full">
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full mb-2 mx-2 border border-gray-300 bg-gray-50 rounded px-3 py-2 text-lg focus:outline-none cursor-pointer"
      >
        <option value="" disabled hidden>
          {`-- Select an optioin --`}
        </option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
