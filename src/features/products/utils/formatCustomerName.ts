const formatCustomerName = (fullName: string) => {
  const parts = fullName.trim().split(" ");
  if (parts.length === 1) return parts[0];
  const firstName = parts[0];
  const lastInitial = parts[parts.length - 1][0];
  return `${firstName} ${lastInitial}.`;
};

export default formatCustomerName;
