import type { TFunction } from "i18next";

export const parseServiceError = (message: string, t: TFunction) => {
  const failedMatch = message.match(/^failed_to_([a-z]+)_(.+)$/);
  if (failedMatch) {
    return t("errors.failed", {
      action: t(`errors.actions.${failedMatch[1]}`),
      entity: t(`errors.entities.${failedMatch[2]}`),
    });
  }

  const notAvailableMatch = message.match(/^(.+)_not_available$/);
  if (notAvailableMatch) {
    return t("errors.not_available", {
      entity: t(`errors.entities.${notAvailableMatch[1]}`),
    });
  }

  return t("errors.unknown");
};
