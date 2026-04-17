import { PAGE } from "@/pages/pageConfig";
import type { MenuItem } from "@/types/header/menuItem";
import { type TFunction } from "i18next";
import {
  Heart,
  LogIn,
  LogOut,
  Package,
  Settings,
  User,
  UserPlus,
} from "lucide-react";

export const getUserMenu = (t: TFunction, signOut: () => void): MenuItem[] => [
  {
    label: t("header.profile"),
    icon: <User className="size-4" />,
    to: PAGE.USER.PROFILE,
  },
  {
    label: t("header.orders"),
    icon: <Package className="size-4" />,
    to: PAGE.USER.ORDERS,
  },
  {
    label: t("header.wishlist"),
    icon: <Heart className="size-4" />,
    to: PAGE.USER.WISHLIST,
  },
  {
    label: t("header.settings"),
    icon: <Settings className="size-4" />,
    to: PAGE.USER.SETTINGS,
  },
  {
    label: t("header.logout"),
    icon: <LogOut className="size-4" />,
    type: "button",
    onClick: signOut,
  },
];

export const getGuestMenu = (t: TFunction): MenuItem[] => [
  {
    label: t("login.login"),
    icon: <LogIn className="size-4" />,
    to: PAGE.AUTH.LOGIN,
  },
  {
    label: t("register.register"),
    icon: <UserPlus className="size-4" />,
    to: PAGE.AUTH.REGISTER,
  },
];
