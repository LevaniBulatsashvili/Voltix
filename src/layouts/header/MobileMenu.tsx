import { useState, useEffect } from "react";
import NavLinks from "./NavLinks";
import SearchBar from "../../components/ui/SearchBar";
import Actions from "./Actions";
import type { IMobileMenu } from "../../types/header/MobileMenu";

const MobileMenu = ({
  navLinks,
  languages,
  currentLanguage,
  onLanguageChange,
  onToggleTheme,
  closeMenu,
}: IMobileMenu) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setOpen(false);
    setTimeout(closeMenu, 300);
  };

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        className={`fixed top-13 right-0 h-[68vh] w-70 pt-4 border border-gray-600 border-r-0 bg-primary text-background shadow-xl z-50
                    rounded-l-2xl transform transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
                    ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col gap-6 px-4 pb-6 overflow-y-auto h-[calc(100%-56px)]">
          <Actions
            languages={languages}
            currentLanguage={currentLanguage}
            onLanguageChange={onLanguageChange}
            onToggleTheme={onToggleTheme}
          />

          <SearchBar />

          <nav className="flex flex-col gap-2 mt-2">
            <NavLinks
              links={navLinks}
              onClick={handleClose}
              className="text-lg font-medium px-2 py-2 hover:bg-primary/80 rounded transition"
            />
          </nav>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
      />
    </>
  );
};

export default MobileMenu;
