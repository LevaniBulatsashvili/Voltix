import { useState } from "react";
import { useTranslation } from "react-i18next";
import Logo from "./Logo";
import NavDropdown from "./NavDropdown";
import Actions from "./Actions";
import MobileMenu from "./MobileMenu";
import SearchBar from "../../components/ui/SearchBar";
import { useAppDispatch } from "../../hooks/redux";
import { toggleTheme } from "../../store/theme/theme.slice";
import { Menu, X } from "lucide-react";
import type { IHeader } from "../../types/header";

const UserHeader = ({ navLinks, languages }: IHeader) => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const toggleMode = () => dispatch(toggleTheme());

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="items-center bg-primary text-background py-4 sm:py-5 md:py-6 px-8 sm:px-10 md:px-16 lg:px-25 flex flex-col gap-10 sm:flex-row sm:items-center sm:gap-6 relative">
      <div className="flex justify-between items-center w-full sm:w-auto">
        <Logo label="voltix" />
        <button
          className="sm:hidden p-2 rounded hover:bg-primary/70 transition"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <MobileMenu
          navLinks={navLinks}
          languages={languages}
          currentLanguage={i18n.language}
          onLanguageChange={(lang) => i18n.changeLanguage(lang)}
          onToggleTheme={toggleMode}
          closeMenu={() => setMenuOpen(false)}
        />
      )}

      <div className="hidden sm:flex items-center justify-between w-full gap-6">
        <NavDropdown navLinks={navLinks} />

        <div className="flex items-center gap-4 flex-1 min-w-0 justify-end">
          <div className="flex-1 min-w-21.5 max-w-lg">
            <SearchBar />
          </div>
          <Actions
            languages={languages}
            currentLanguage={i18n.language}
            onLanguageChange={(lang) => i18n.changeLanguage(lang)}
            onToggleTheme={toggleMode}
          />
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
