import { toast } from "react-toastify";
import i18n from "../i18n/i18n";

interface PromiseMessages {
  loading: string;
  success: string;
  error?: string;
  params?: Record<string, string>;
}

export const notify = {
  success: (message: string) => toast.success(i18n.t(message)),
  error: (message: string) => toast.error(i18n.t(message)),
  info: (message: string) => toast.info(i18n.t(message)),
  warning: (message: string) => toast.warning(i18n.t(message)),

  promise: <T>(promise: Promise<T>, messages: PromiseMessages): Promise<T> => {
    const params = messages.params
      ? {
          ...messages.params,
          entity: messages.params.entity
            ? i18n.t(`entities.${messages.params.entity}`)
            : undefined,
        }
      : undefined;

    return toast.promise(promise, {
      pending: i18n.t(messages.loading, params),
      success: i18n.t(messages.success, params),
      error: {
        render({ data }) {
          if (messages.error) return i18n.t(messages.error, params);
          if (data && typeof data === "object" && "message" in data) {
            const msg = (data as { message?: string }).message ?? "";
            return i18n.t(`errors.supabase.${msg}`, { defaultValue: msg });
          }
          return i18n.t("errors.unknown");
        },
      },
    });
  },
};
