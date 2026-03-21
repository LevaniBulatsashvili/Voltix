import { useTranslation } from "react-i18next";

interface ILabel {
  htmlFor: string;
  text: string;
}

export const Label = ({ htmlFor, text }: ILabel) => {
  const { t } = useTranslation();

  return (
    <label
      htmlFor={htmlFor}
      className="block mb-3 text-lg text-black opacity-90 capitalize"
    >
      {t(text)}
    </label>
  );
};
