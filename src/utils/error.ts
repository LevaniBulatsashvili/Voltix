interface IHttpError {
  status: number;
}

export const isHttpError = (error: unknown): error is IHttpError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    typeof (error as { status: unknown }).status === "number"
  );
};

export const extractErrorMessage = (error: unknown): string => {
  if (typeof error === "object" && error !== null && "message" in error)
    return String((error as { message: unknown }).message);

  return "something_went_wrong";
};
