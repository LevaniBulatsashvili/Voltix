export const PROTECTED_ACCOUNTS = [
  "voltixdeveloper@test.com",
  "voltixadmin@test.com",
  "voltixuser@test.com",
];

const PROTECTED_SET = new Set(PROTECTED_ACCOUNTS);

export const isAccountProtected = (email: string | null | undefined) =>
  !!email && PROTECTED_SET.has(email);
