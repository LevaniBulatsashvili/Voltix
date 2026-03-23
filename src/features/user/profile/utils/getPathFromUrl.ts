export const getPathFromUrl = (url: string) => {
  const split = url.split("/avatars/");
  if (split.length < 2) return null;

  return split[1];
};
