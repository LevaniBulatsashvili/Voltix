import { toast } from "react-toastify";
import i18n from "../i18n/i18n";

export const notify = {
  success: (message: string) => toast.success(i18n.t(message)),

  error: (message: string) => toast.error(i18n.t(message)),

  info: (message: string) => toast.info(i18n.t(message)),

  warning: (message: string) => toast.warning(i18n.t(message)),
};
