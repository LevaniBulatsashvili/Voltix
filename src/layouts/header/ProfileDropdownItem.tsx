import AppLink from "@/components/button/AppLink";
import type { MenuItem } from "@/types/header/menuItem";

const ProfileDropdownItem = ({
  item,
  onClick,
}: {
  item: MenuItem;
  onClick: () => void;
}) => {
  const Icon = item.icon;

  if (item.type === "button") {
    return (
      <button
        onClick={() => {
          item.onClick?.();
          onClick();
        }}
        className="w-full flex items-center gap-2 px-4 py-2 hover:opacity-90"
        role="menuitem"
      >
        <Icon className="size-4" />
        {item.label}
      </button>
    );
  }

  return (
    <AppLink
      to={item.to!}
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 hover:opacity-90"
      role="menuitem"
    >
      <Icon className="size-4" />
      {item.label}
    </AppLink>
  );
};

export default ProfileDropdownItem;
