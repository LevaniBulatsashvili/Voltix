import { useTranslation } from "react-i18next";

interface IFormHeader {
  text: string;
  className?: string;
}
const FormHeader = ({ text, className }: IFormHeader) => {
  const { t } = useTranslation();

  return (
    <h1
      className={`text-3xl mb-10 font-bold text-center capitalize ${className ?? ""}`}
    >
      {t(text)}
    </h1>
  );
};

export default FormHeader;
