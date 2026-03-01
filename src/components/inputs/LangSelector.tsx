import { Globe } from "lucide-react";

interface ILangSelector {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  languages: { value: string; language: string }[];
}

const LangSelector = ({ value, onChange, languages }: ILangSelector) => {
  return (
    <div className="relative size-7 hover:text-neutral-600 transition">
      <Globe className="size-7" />

      <select
        value={value}
        onChange={onChange}
        className="absolute text-center top-2 -right-3 opacity-0 cursor-pointer"
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.language}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LangSelector;
