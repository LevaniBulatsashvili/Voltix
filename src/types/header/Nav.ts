export interface INavLink {
  label: string;
  to: string;
}

export interface IHeaderNav {
  links: INavLink[];
  onLinkClick?: () => void;
  className?: string;
}
