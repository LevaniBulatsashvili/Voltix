export interface ILanguage {
  value: string;
  language: string;
  code: string;
}

export interface IActions {
  cartProducts: number;
  languages: ILanguage[];
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
  onToggleTheme: () => void;
}
