import type { INavLink } from "./Nav";
import type { ILanguage } from ".";

export interface IMobileMenu {
  navLinks: INavLink[];
  languages: ILanguage[];
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
  onToggleTheme: () => void;
  closeMenu: () => void;
}
