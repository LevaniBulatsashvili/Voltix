import i18n from "i18next";
import { notifyError } from "./notifyError";

export const notifySupabaseError = (err: unknown) => {
  let message: string;

  if (err && typeof err === "object" && "message" in err) {
    const supabaseErr = err as { message?: string };
    message = i18n.t(`errors.supabase.${supabaseErr.message}`, {
      defaultValue: supabaseErr.message || i18n.t("errors.unknown"),
    });
  } else if (typeof err === "string")
    message = i18n.t(`errors.supabase.${err}`, { defaultValue: err });
  else message = i18n.t("errors.unknown");

  notifyError(message);
};
