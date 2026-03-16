import type { INavLink } from "./Nav";

export interface IHeader {
  cartProducts: number;
  navLinks: INavLink[];
  languages: ILanguage[];
}

export interface ILanguage {
  value: string;
  language: string;
  code: string;
}
