import { useState } from "react";
import {
  ShoppingCart,
  User,
  ChevronDown,
  LogOut,
  Settings,
  Heart,
  Package,
} from "lucide-react";
import AppLink from "../../components/button/AppLink";
import LangSelector from "../../components/inputs/LangSelector";
import ToggleBtn from "../../components/button/ToggleBtn";
import { PAGE } from "../../pages/pageConfig";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { logout } from "../../features/auth/store/auth.slice";
import type { ILanguage } from "../../types/header";

interface IActions {
  cartProducts?: number;
  languages: ILanguage[];
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
  onToggleTheme: () => void;
}

const Actions = ({
  cartProducts,
  languages,
  currentLanguage,
  onLanguageChange,
  onToggleTheme,
}: IActions) => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false);
  };

  return (
    <div className="flex items-center gap-4 flex-wrap relative">
      {user?.email_verified && (
        <AppLink to={PAGE.CART} className="relative">
          <ShoppingCart className="w-6 h-6" />
          {cartProducts && cartProducts > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {cartProducts}
            </span>
          )}
        </AppLink>
      )}

      {user?.email_verified && (
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-1 border-2 p-1 rounded-full hover:shadow-lg transition"
          >
            <User className="w-6 h-6" />
            <ChevronDown
              className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg border overflow-hidden z-50">
              <AppLink
                to={PAGE.PROFILE}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
              >
                <User className="w-4 h-4" /> Profile
              </AppLink>
              <AppLink
                to={PAGE.ORDERS}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
              >
                <Package className="w-4 h-4" /> Orders
              </AppLink>
              <AppLink
                to={PAGE.WISHLIST}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
              >
                <Heart className="w-4 h-4" /> Wishlist
              </AppLink>
              <AppLink
                to={PAGE.SETTINGS}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
              >
                <Settings className="w-4 h-4" /> Settings
              </AppLink>
              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          )}
        </div>
      )}

      <LangSelector
        value={currentLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
        languages={languages}
      />

      <ToggleBtn
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
