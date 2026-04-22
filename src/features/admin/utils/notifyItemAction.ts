import i18next from "i18next";
import { store } from "@/store";
import { addNotification } from "@/store/notification/notification.slice";

export const notifyItemAction = (
  item: string,
  action: "create" | "update" | "delete",
) => {
  const message = i18next.t("admin_management.item_action", {
    item: i18next.t(`admin_management.items.${item}`),
    action: i18next.t(`admin_management.actions.${action}`),
  });

  store.dispatch(
    addNotification({
      id: crypto.randomUUID(),
      type: "success",
      message,
    }),
  );
};
