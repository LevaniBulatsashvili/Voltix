import { useRef, useState, useMemo, useCallback, memo } from "react";
import { useAppSelector } from "@/hooks/redux";
import type { ILanguage } from "@/types/header";
import { useLogout } from "@/hooks/useLogout";
import { useTranslation } from "react-i18next";
import { useClickOutside } from "@/hooks/useClickOutside";
import ProfileDropdownItem from "./ProfileDropdownItem";
import {
  getAdminMenu,
  getDeveloperMenu,
  getGuestMenu,
  getUserMenu,
} from "../utils/menuGenerators";
import { useRole } from "@/features/user/profile/hooks/useRole";
import CartButton from "./CartBtn";
import LangSelector from "@/components/inputs/LangSelector";
import ToggleBtn from "@/components/button/ToggleBtn";
import { User } from "lucide-react";
import { shallowEqual } from "react-redux";

interface IActions {
  languages: ILanguage[];
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
  onToggleTheme: () => void;
  onNavigate?: () => void;
}

const Actions = memo(
  ({
    languages,
    currentLanguage,
    onLanguageChange,
    onToggleTheme,
    onNavigate,
  }: IActions) => {
    const { t } = useTranslation();
    const { signOut } = useLogout();
    const theme = useAppSelector((state) => state.theme.theme);
    const profile = useAppSelector(
      (state) => state.profile.profile,
      shallowEqual,
    );
    const cartItems = useAppSelector((state) => state.cart.items);
    const { isUser, isAdmin, isDeveloper, isVerified } = useRole();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useClickOutside(dropdownRef, () => setDropdownOpen(false));

    const totalItems = useMemo(
      () => cartItems.reduce((acc, { quantity }) => acc + quantity, 0),
      [cartItems],
    );

    const handleLogout = useCallback(() => {
      signOut();
      setDropdownOpen(false);
    }, [signOut]);

    const handleDropdownClick = useCallback(() => {
      setDropdownOpen(false);
      onNavigate?.();
    }, [onNavigate]);

    const menu = useMemo(() => {
      if (!profile) return getGuestMenu(t);
      if (isUser) return getUserMenu(t, handleLogout);
      if (isAdmin) return getAdminMenu(t, handleLogout);
      return getDeveloperMenu(t, handleLogout);
    }, [profile, isUser, isAdmin, t, handleLogout]);

    return (
      <div className="flex items-center gap-4 flex-wrap relative">
        {isVerified && (isUser || isDeveloper) && (
          <CartButton totalItems={totalItems} onNavigate={onNavigate} />
        )}

        <div className="relative">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="size-8 rounded-full flex items-center justify-center"
            aria-expanded={dropdownOpen}
            aria-haspopup="menu"
            aria-label="User menu"
          >
            <User className="size-7 object-cover rounded-full border" />
          </button>

          {dropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute left-0 mt-1 w-42 bg-primary text-background rounded shadow-lg border border-background overflow-hidden z-50"
            >
              {menu.map((item) => (
                <ProfileDropdownItem
                  key={item.label}
                  item={item}
                  onClick={handleDropdownClick}
                />
              ))}
            </div>
          )}
        </div>

        <LangSelector
          value={currentLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          languages={languages}
        />

        <ToggleBtn
          isActive={theme === "dark"}
          onToggle={onToggleTheme}
          className="border border-indigo-400 shadow-md transition-all duration-300 hover:border-indigo-600 hover:shadow-lg hover:scale-105"
          inactiveToggleClassName="bg-gradient-to-r from-pink-200 via-purple-200 to-blue-300 border-gray-400 hover:from-pink-300 hover:via-purple-300 hover:to-blue-400"
          activeToggleClassName="bg-gradient-to-r from-indigo-800 via-blue-900 to-gray-900 border-gray-700 hover:from-indigo-700 hover:via-blue-800 hover:to-gray-800"
          inactiveThumbClassName="bg-yellow-400 hover:bg-yellow-300"
          activeThumbClassName="bg-gray-200 hover:bg-gray-100"
        />
      </div>
    );
  },
);

export default Actions;
