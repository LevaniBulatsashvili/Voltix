import { ShoppingCart, User } from "lucide-react";
import AppLink from "../../components/button/AppLink";
import LangSelector from "../../components/inputs/LangSelector";
import ToggleBtn from "../../components/button/ToggleBtn";
import { PAGE } from "../../pages/pageConfig";
import type { IActions } from "../../types/header/Actions";

const Actions = ({
  cartProducts,
  languages,
  currentLanguage,
  onLanguageChange,
  onToggleTheme,
}: IActions) => (
  <div className="flex items-center gap-4 flex-wrap">
    <AppLink to={PAGE.CART}>
      <div className="relative">
        <ShoppingCart className="w-6 h-6" />
        {cartProducts > 0 && (
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {cartProducts}
          </span>
        )}
      </div>
    </AppLink>

    <AppLink to={PAGE.PROFILE} className="border-2 p-0.5 rounded-full">
      <User className="w-6 h-6" />
    </AppLink>

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

export default Actions;
