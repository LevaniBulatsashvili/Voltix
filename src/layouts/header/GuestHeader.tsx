import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@/hooks/redux";
import { toggleTheme } from "@/store/theme/theme.slice";
import Logo from "./Logo";
import Actions from "./Actions";
import type { ILanguage } from "@/types/header";

const GuestHeader = ({ languages }: { languages: ILanguage[] }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const toggleMode = () => dispatch(toggleTheme());

  return (
    <header className="items-center bg-primary text-background py-4 sm:py-5 md:py-6 px-8 sm:px-10 md:px-16 lg:px-25 flex justify-between">
      <Logo label={t("voltix")} />

      <Actions
        languages={languages}
        currentLanguage={i18n.language}
        onLanguageChange={(lang) => i18n.changeLanguage(lang)}
        onToggleTheme={toggleMode}
      />
    </header>
  );
};

export default GuestHeader;
