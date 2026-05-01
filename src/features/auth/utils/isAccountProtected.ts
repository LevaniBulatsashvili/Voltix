export const PROTECTED_ACCOUNTS = [
  "voltixdeveloper@test.com",
  "voltixadmin@test.com",
  "voltixuser@test.com",
];

export const isAccountProtected = (
  email: string | null | undefined,
): boolean => {
  if (!email) return false;
  return PROTECTED_ACCOUNTS.includes(email);
};
