import { useRef, useState } from "react";
import { ShoppingCart, User } from "lucide-react";
import AppLink from "@/components/button/AppLink";
import LangSelector from "@/components/inputs/LangSelector";
import ToggleBtn from "@/components/button/ToggleBtn";
import { PAGE } from "@/pages/pageConfig";
import { useAppSelector } from "@/hooks/redux";
import type { ILanguage } from "@/types/header";
import { useLogout } from "@/hooks/useLogout";
import { useTranslation } from "react-i18next";
import { useClickOutside } from "@/hooks/useClickOutside";
import ProfileDropdownItem from "./ProfileDropdownItem";
import {
  getAdminMenu,
  getGuestMenu,
  getUserMenu,
} from "../utils/menuGenerators";
import { useRole } from "@/features/user/profile/hooks/useRole";

interface IActions {
  languages: ILanguage[];
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
  onToggleTheme: () => void;
}

const Actions = ({
  languages,
  currentLanguage,
  onLanguageChange,
  onToggleTheme,
}: IActions) => {
  const { t } = useTranslation();
  const { signOut } = useLogout();
  const { theme } = useAppSelector((state) => state.theme);
  const { profile } = useAppSelector((state) => state.profile);
  const { isUser, isCourier, isAdmin, isVerified } = useRole();
  const { items: cartItems } = useAppSelector((state) => state.cart);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, () => setDropdownOpen(false));
  const totalItems = cartItems.reduce((acc, { quantity }) => acc + quantity, 0);

  const handleLogout = () => {
    signOut();
    setDropdownOpen(false);
  };

  let menu;

  if (!profile) menu = getGuestMenu(t);
  else if (isUser) menu = getUserMenu(t, handleLogout);
  else if (isAdmin) menu = getAdminMenu(t, handleLogout);
  else if (isCourier) menu = getUserMenu(t, handleLogout);
  else menu = getUserMenu(t, handleLogout);

  return (
    <div className="flex items-center gap-4 flex-wrap relative">
      {isVerified && isUser && (
        <AppLink to={PAGE.USER.CART} className="relative">
          <ShoppingCart className="w-6 h-6" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </AppLink>
      )}

      <div className="relative">
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="size-8 rounded-full flex items-center justify-center"
        >
          <User className="size-7  object-cover rounded-full border" />
        </button>

        {dropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute -right-19 sm:-right-17 mt-1 w-42 bg-primary text-background rounded shadow-lg border border-background overflow-hidden z-50"
          >
            {menu.map((item, i) => (
              <ProfileDropdownItem
                key={i}
                item={item}
                onClick={() => setDropdownOpen(false)}
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
};

export default Actions;
