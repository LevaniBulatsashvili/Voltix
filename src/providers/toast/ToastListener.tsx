import { useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { notify } from "@/lib/toast/toast";
import { removeNotification } from "@/store/notification/notification.slice";
import i18n from "@/lib/i18n/i18n";

const ToastListener = () => {
  const notifications = useAppSelector((state) => state.notification.queue);
  const dispatch = useAppDispatch();
  const shown = useRef(new Set<string>());

  useEffect(() => {
    notifications.forEach((notification) => {
      if (shown.current.has(notification.id)) return;

      notify[notification.type](i18n.t(notification.message));
      shown.current.add(notification.id);
      dispatch(removeNotification(notification.id));
    });
  }, [notifications, dispatch]);

  return null;
};

export default ToastListener;
