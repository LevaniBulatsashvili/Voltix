import { PAGE } from "../pages/pageConfig";
import SearchBar from "../components/ui/SearchBar";
import { ShoppingCart, User } from "lucide-react";
import AppLink from "../components/button/AppLink";
import type { ReactNode } from "react";

const Brand = () => (
  <AppLink to={PAGE.BASE} className="text-4xl font-extrabold">
    Vortix
  </AppLink>
);

interface NavLinksProps {
  links: { label: string; to: string }[];
}

const NavLinks = ({ links }: NavLinksProps) => (
  <nav className="flex">
    <ul className="flex items-center gap-6 whitespace-nowrap">
      {links.map((link, index) => (
        <li key={index}>
          <AppLink to={link.to}>{link.label}</AppLink>
        </li>
      ))}
    </ul>
  </nav>
);

interface IconButtonProps {
  to: string;
  icon: ReactNode;
  badge?: number;
}

const IconButton = ({ to, icon, badge }: IconButtonProps) => (
  <AppLink to={to} className="relative">
    {icon}
    {badge !== undefined && (
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
        {badge}
      </span>
    )}
  </AppLink>
);

const Navbar = () => {
  const cartProducts = 2;
  const navLinks = [
    { label: "Shop", to: "#" },
    { label: "On Sale", to: "#" },
    { label: "New Arrivals", to: "#" },
    { label: "Brands", to: "#" },
  ];

  return (
    <header className="my-6 mx-25 flex gap-10 items-center">
      <Brand />
      <NavLinks links={navLinks} />
      <SearchBar />
      <div className="flex items-center gap-4">
        <IconButton
          to="/cart"
          icon={<ShoppingCart className="size-7" />}
          badge={cartProducts}
        />
        <IconButton to="/profile" icon={<User className="size-7" />} />
      </div>
    </header>
  );
};

export default Navbar;
