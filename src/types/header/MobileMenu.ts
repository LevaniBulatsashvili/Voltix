import type { INavLink } from "./Nav";
import type { ILanguage } from "./Actions";

export interface IMobileMenu {
  navLinks: INavLink[];
  languages: ILanguage[];
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
  cartProducts: number;
  onToggleTheme: () => void;
  closeMenu: () => void;
}
