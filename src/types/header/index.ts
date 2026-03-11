import type { INavLink } from "./Nav";
import type { ILanguage } from "./Actions";

export interface IHeader {
  cartProducts: number;
  navLinks: INavLink[];
  languages: ILanguage[];
}
