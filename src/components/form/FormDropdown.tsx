import { ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface IFormDropdown {
  text: string;
  placeholder?: string;
  components: ReactNode[];
}

export const FormDropdown = ({
  text,
  placeholder = "profile.details",
  components,
}: IFormDropdown) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative ">
      <div className="w-full grid " onClick={() => setOpen(!open)}>
        <p className="mb-3 text-lg text-black opacity-90 capitalize">
          {t(text)}
        </p>
        <button
          type="button"
          className="
          flex justify-between items-center h-14 w-full p-5 text-black text-lg rounded-lg focus:outline-gray-400 bg-gray-200"
          onClick={() => setOpen(!open)}
        >
          <span className="capitalize">{t(placeholder)}</span>
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-50 ${
              open ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>

      {open && (
        <div className="absolute z-10 mt-0.5 w-full pb-2 bg-background border border-gray-400 rounded-lg">
          {components.map((comp, i) => (
            <div key={i} className="py-4 px-6">
              {comp}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
