type TErrorKey =
  | "unknown"
  | "network"
  | "invalid_credentials"
  | "email_not_confirmed"
  | "user_exists";

export const getErrorKey = (error: unknown): TErrorKey => {
  if (typeof error === "object" && error !== null && "message" in error) {
    const message = String((error as { message: unknown }).message);

    if (message.includes("Invalid login credentials"))
      return "invalid_credentials";

    if (message.includes("Email not confirmed")) return "email_not_confirmed";

    if (message.includes("User already registered")) return "user_exists";

    if (message.includes("Failed to fetch")) return "network";
  }

  return "unknown";
};
