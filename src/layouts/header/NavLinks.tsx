import type { INavLink } from "../../types/header/Nav";
import AppLink from "../../components/button/AppLink";

interface INavLinks {
  links: INavLink[];
  onClick?: () => void;
  className?: string;
}

const NavLinks = ({ links, onClick, className = "" }: INavLinks) => (
  <nav>
    <ul
      className={`flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 whitespace-nowrap ${className}`}
    >
      {links.map((link) => (
        <li key={link.label}>
          <AppLink
            to={link.to}
            onClick={onClick}
            className="block py-2 sm:py-0 border-b-2 border-transparent hover:border-current transition-all duration-200"
          >
            {link.label}
          </AppLink>
        </li>
      ))}
    </ul>
  </nav>
);

export default NavLinks;
