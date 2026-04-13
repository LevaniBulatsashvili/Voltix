import { useState, useRef } from "react";
import { Menu, X } from "lucide-react";
import NavLinks from "./NavLinks";
import type { INavLink } from "@/types/header/Nav";
import { useClickOutside } from "@/hooks/useClickOutside";

interface INavDropdown {
  navLinks: INavLink[];
  bgClass?: string;
  textClass?: string;
  breakpoint?: string;
}

const NavDropdown = ({
  navLinks,
  bgClass = "bg-white dark:bg-gray-800",
  textClass = "text-gray-900 dark:text-gray-100",
}: INavDropdown) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef as React.RefObject<HTMLElement>, () =>
    setOpen(false),
  );

  return (
    <div className="flex items-center relative" ref={dropdownRef}>
      <div className={`hidden xl:flex`}>
        <NavLinks links={navLinks} />
      </div>

      <div className={`xl:hidden relative flex items-center`}>
        <button
          className="p-2 rounded hover:bg-primary/70 transition-colors duration-200 z-10"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>

        <div
          className={`absolute -top-0.75 left-full ${bgClass} rounded-lg shadow-lg z-50 overflow-hidden flex transition-all duration-300 ease-out ${
            open
              ? "opacity-100 scale-x-100 pointer-events-auto"
              : "opacity-0 scale-x-0 pointer-events-none"
          }`}
          style={{ transformOrigin: "left center" }}
        >
          <NavLinks
            links={navLinks}
            onClick={() => setOpen(false)}
            className={`flex flex-row gap-4 px-4 py-2.5 ${textClass}`}
          />
        </div>
      </div>
    </div>
  );
};

export default NavDropdown;
